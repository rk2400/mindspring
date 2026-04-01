import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Appointment from '@/lib/models/Appointment';
import User from '@/lib/models/User';
import { withAuth, AuthRequest } from '@/lib/middleware';
import { appointmentSchema } from '@/lib/validations';
import { emailService } from '@/lib/email';
import { adminConfig, appConfig } from '@/lib/config';

async function getHandler(req: AuthRequest) {
  try {
    await connectDB();

    if (!req.user || req.user.type !== 'user' || !req.user.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const appointments = await Appointment.find({ userId: req.user.userId })
      .sort({ preferredDate: 1, preferredTime: 1 });

    return NextResponse.json({ appointments });
  } catch (error: any) {
    console.error('Get appointments error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

async function postHandler(req: AuthRequest) {
  try {
    await connectDB();

    if (!req.user || req.user.type !== 'user' || !req.user.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { therapyType, preferredDate, preferredTime, notes, duration } = appointmentSchema.parse(body);

    const requestedDate = new Date(preferredDate);
    requestedDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (requestedDate < today) {
      return NextResponse.json({ error: 'Preferred date cannot be in the past.' }, { status: 400 });
    }

    const existingActiveUpcomingAppointment = await Appointment.findOne({
      userId: req.user.userId,
      status: { $in: ['REQUESTED', 'CONFIRMED'] },
      $or: [
        { preferredDate: { $gt: preferredDate } },
        {
          preferredDate,
          preferredTime: { $gte: preferredTime },
        },
      ],
    }).sort({ preferredDate: 1, preferredTime: 1 });

    if (existingActiveUpcomingAppointment) {
      return NextResponse.json(
        {
          error: 'You already have an active upcoming appointment. Please complete or cancel it before booking another session.',
        },
        { status: 400 }
      );
    }

    const appointment = await Appointment.create({
      userId: req.user.userId,
      therapyType,
      preferredDate,
      preferredTime,
      notes: notes || '',
      duration: duration || '30 minutes',
    });

    const user = await User.findById(req.user.userId).lean();
    const userName = user?.name || req.user.email;
    const userEmail = req.user.email;
    const appointmentDetails = `
      <p><strong>Therapy:</strong> ${therapyType}</p>
      <p><strong>Date:</strong> ${preferredDate}</p>
      <p><strong>Time:</strong> ${preferredTime}</p>
      ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
    `;

    await Promise.allSettled([
      emailService.sendEmail({
        to: userEmail,
        subject: `${appConfig.name} Appointment Request Received`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #0f172a;">${appConfig.name} Appointment Request Received</h2>
            <p>Hi ${userName},</p>
            <p>We have received your appointment request. Our team will review your request and confirm the schedule shortly.</p>
            ${appointmentDetails}
            <p style="margin-top: 20px; color: #64748b; font-size: 14px;">Thank you for trusting ${appConfig.name} with your child’s therapy journey.</p>
          </div>
        `,
      }),
      adminConfig.email
        ? emailService.sendEmail({
            to: adminConfig.email,
            subject: `New Appointment Request from ${userName}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #0f172a;">New Appointment Request</h2>
                <p><strong>User:</strong> ${userName} &lt;${userEmail}&gt;</p>
                ${appointmentDetails}
                <p style="margin-top: 20px; color: #64748b; font-size: 14px;">Please review and confirm this appointment in the admin dashboard.</p>
              </div>
            `,
          })
        : Promise.resolve(true),
    ]);

    return NextResponse.json({ appointment }, { status: 201 });
  } catch (error: any) {
    console.error('Create appointment error:', error);
    if (error?.issues) {
      return NextResponse.json(
        { error: 'Invalid appointment details', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to create appointment' },
      { status: 500 }
    );
  }
}

export const GET = withAuth(getHandler);
export const POST = withAuth(postHandler);

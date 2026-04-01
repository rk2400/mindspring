import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Appointment from '@/lib/models/Appointment';
import User from '@/lib/models/User';
import { withAdminAuth } from '@/lib/middleware';
import { adminAppointmentSchema } from '@/lib/validations';
import { emailService } from '@/lib/email';
import { appConfig } from '@/lib/config';

async function getHandler(req: Request) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');
    const query: any = {};

    if (userId) {
      query.userId = userId;
    }

    const appointments = await Appointment.find(query)
      .populate('userId', 'name email')
      .sort({ preferredDate: 1, preferredTime: 1 })
      .lean();

    return NextResponse.json({ appointments });
  } catch (error: any) {
    console.error('Admin get appointments error:', error);
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}

async function postHandler(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { userId, therapyType, preferredDate, preferredTime, notes, duration, adminNote } = adminAppointmentSchema.parse(body);

    const user = await User.findById(userId).lean();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const requestedDate = new Date(preferredDate);
    requestedDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (requestedDate < today) {
      return NextResponse.json({ error: 'Preferred date cannot be in the past.' }, { status: 400 });
    }

    const appointment = await Appointment.create({
      userId,
      therapyType,
      preferredDate,
      preferredTime,
      notes: notes || '',
      duration: duration || '60 minutes',
      adminNote: adminNote || '',
      status: 'CONFIRMED',
    });

    const appointmentDetails = `
      <p><strong>Therapy:</strong> ${therapyType}</p>
      <p><strong>Date:</strong> ${preferredDate}</p>
      <p><strong>Time:</strong> ${preferredTime}</p>
      <p><strong>Duration:</strong> ${duration || '60 minutes'}</p>
      ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
      ${adminNote ? `<p><strong>Admin note:</strong> ${adminNote}</p>` : ''}
    `;

    await emailService.sendEmail({
      to: user.email,
      subject: `${appConfig.name} Appointment Scheduled`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0f172a;">${appConfig.name} Appointment Scheduled</h2>
          <p>Hi ${user.name || user.email},</p>
          <p>An appointment has been scheduled on your behalf.</p>
          ${appointmentDetails}
          <p style="margin-top: 20px; color: #64748b; font-size: 14px;">If you need to adjust this booking, please reply to our admin team.</p>
        </div>
      `,
    });

    return NextResponse.json({ appointment }, { status: 201 });
  } catch (error: any) {
    console.error('Admin create appointment error:', error);
    if (error?.issues) {
      return NextResponse.json(
        { error: 'Invalid appointment details', details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 });
  }
}

export const GET = withAdminAuth(getHandler);
export const POST = withAdminAuth(postHandler);

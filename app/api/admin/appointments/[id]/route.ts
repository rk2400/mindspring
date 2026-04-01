import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Appointment from '@/lib/models/Appointment';
import User from '@/lib/models/User';
import { withAdminAuth } from '@/lib/middleware';
import { appointmentStatusSchema } from '@/lib/validations';
import { emailService } from '@/lib/email';
import { appConfig } from '@/lib/config';

async function patchHandler(req: Request, ctx: { params: { id: string } }) {
  try {
    await connectDB();

    const { id } = ctx.params;
    const body = await req.json();
    const { status, note } = appointmentStatusSchema.parse(body);

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    if (appointment.status === 'CANCELLED' && status !== 'CANCELLED') {
      return NextResponse.json({ error: 'Cancelled appointments cannot be changed.' }, { status: 400 });
    }

    appointment.status = status;
    if (typeof note === 'string' && note.trim().length > 0) {
      appointment.adminNote = note.trim();
    }

    await appointment.save();
    await appointment.populate('userId', 'name email');

    const user = appointment.userId as any;
    const userName = user?.name || user?.email || 'MindSpring client';
    const userEmail = user?.email || '';

    const statusMessage =
      status === 'CONFIRMED'
        ? 'Your appointment has been confirmed.'
        : status === 'CANCELLED'
        ? 'Your appointment has been cancelled.'
        : status === 'COMPLETED'
        ? 'Your appointment has been marked as completed.'
        : 'Your appointment status has been updated.';

    await emailService.sendEmail({
      to: userEmail,
      subject: `${appConfig.name} Appointment Update: ${status}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0f172a;">${appConfig.name} Appointment Update</h2>
          <p>Hi ${userName},</p>
          <p>${statusMessage}</p>
          <p><strong>Therapy:</strong> ${appointment.therapyType}</p>
          <p><strong>Date:</strong> ${appointment.preferredDate}</p>
          <p><strong>Time:</strong> ${appointment.preferredTime}</p>
          <p><strong>Status:</strong> ${status}</p>
          ${appointment.notes ? `<p><strong>Client notes:</strong> ${appointment.notes}</p>` : ''}
          ${appointment.adminNote ? `<p><strong>Admin note:</strong> ${appointment.adminNote}</p>` : ''}
          <p style="margin-top: 20px; color: #64748b; font-size: 14px;">Thank you for choosing ${appConfig.name}. We are here to support your child’s development journey.</p>
        </div>
      `,
    });

    return NextResponse.json({ appointment });
  } catch (error: any) {
    console.error('Admin update appointment error:', error);
    if (error?.issues) {
      return NextResponse.json(
        { error: 'Invalid status provided', details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 });
  }
}

export const PATCH = withAdminAuth(patchHandler);

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import Appointment from '@/lib/models/Appointment';
import { withAdminAuth } from '@/lib/middleware';

export const GET = withAdminAuth(async (req) => {
  try {
    await connectDB();

    const [totalUsers, totalAppointments] = await Promise.all([
      User.countDocuments(),
      Appointment.countDocuments(),
    ]);

    const revenue = 0;

    const ordersByStatus: any[] = [];

    const appointmentsByStatus = await Appointment.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    return NextResponse.json({
      stats: {
        totalOrders: 0,
        totalRevenue: revenue,
        totalProducts: 0,
        totalUsers,
        totalAppointments,
        ordersByStatus: {},
        appointmentsByStatus: appointmentsByStatus.reduce((acc: any, item: any) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
      },
    });
  } catch (error: any) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
});




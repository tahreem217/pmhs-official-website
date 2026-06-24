import React from 'react';
import prisma from '@/lib/prisma';
import MaintainenceSroll from './MaintenanceSroll';
import { auth } from '@clerk/nextjs/server';

const Maintainence = async () => {
  const maintainenceData = await prisma.maintenanceTicket.findMany({
    where: {
      status: "Pending",
    },
    orderBy: { createdAt: 'desc' },
  });

  const data = maintainenceData.map((mad) => ({ 
    id: mad.id,
    title: mad.title,
    location: mad.location,
    // 1. SAFE FALLBACK: If the DB description is null/undefined, fall back to an empty string
    description: mad.description || "", 
    date: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(mad.createdAt)
  }));

  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  return (
    <div className="w-full h-full min-h-[300px]">
      <MaintainenceSroll data={data} role={role}/>
    </div>
  );
};

export default Maintainence;
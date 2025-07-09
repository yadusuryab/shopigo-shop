// app/api/settings/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Setting from '@/lib/db/models/setting.model';
import data from '@/lib/data';

// Type-safe global cache
const globalForSettings = globalThis as unknown as {
  cachedSettings: typeof data.settings[0] | null;
};

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    
    if (!globalForSettings.cachedSettings) {
      console.log('Fetching fresh settings from DB');
      const setting = await Setting.findOne().lean();
      globalForSettings.cachedSettings = setting 
        ? JSON.parse(JSON.stringify(setting))
        : data.settings[0];
    }

    return NextResponse.json(globalForSettings.cachedSettings);
  } catch (error) {
    console.error('Settings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    revalidatePath('/');
    revalidatePath('/contact');
    revalidatePath('/services/google-ads');
    revalidatePath('/services/meta-ads');
    revalidatePath('/services/web-development');
    revalidatePath('/services/automation');
    return NextResponse.json({ revalidated: true });
  } catch {
    return NextResponse.json({ revalidated: false }, { status: 500 });
  }
}

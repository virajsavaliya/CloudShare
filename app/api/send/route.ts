import { NextResponse } from 'next/server';
import { EmailTemplate } from '../../_components/email-template';
import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    const responce=await req.json();
  try {
    const { name, email, phone, message } = req.body;
    const data = await resend.emails.send({
      
      from: 'cloudshare@resend.dev',
      to: ['savaliyaviraj5@gmail.com'],
      subject: responce?.userName+" Share File with You",
      react: EmailTemplate({responce}),
    });


    


    

    return NextResponse.json(data)
  }catch (error){
    return NextResponse.json({error});
  }
    
}



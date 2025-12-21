import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { assunto, nome, email, telefone, estado, mensagem } = body;

        // Validação básica
        if (!nome || !email || !mensagem) {
            return NextResponse.json(
                { error: 'Nome, email e mensagem são obrigatórios' },
                { status: 400 }
            );
        }

        // Configurar transporter do Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Mapear assunto para texto legível
        const assuntoTexto = assunto === 'orcamento'
            ? 'Solicitação de Orçamento'
            : assunto === 'ajuda'
                ? 'Contato com Suporte'
                : 'Contato via Site';

        // Configurar email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO || process.env.EMAIL_USER,
            replyTo: email,
            subject: `[Mult Point] ${assuntoTexto} - ${nome}`,
            html: `
                <h2>Novo contato via site</h2>
                <p><strong>Assunto:</strong> ${assuntoTexto}</p>
                <p><strong>Nome:</strong> ${nome}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Telefone:</strong> ${telefone || 'Não informado'}</p>
                <p><strong>Estado:</strong> ${estado?.toUpperCase() || 'Não informado'}</p>
                <hr />
                <p><strong>Mensagem:</strong></p>
                <p>${mensagem.replace(/\n/g, '<br>')}</p>
            `,
            text: `
Novo contato via site

Assunto: ${assuntoTexto}
Nome: ${nome}
Email: ${email}
Telefone: ${telefone || 'Não informado'}
Estado: ${estado?.toUpperCase() || 'Não informado'}

Mensagem:
${mensagem}
            `,
        };

        // Enviar email
        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: 'Email enviado com sucesso' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        return NextResponse.json(
            { error: 'Erro ao enviar email. Tente novamente mais tarde.' },
            { status: 500 }
        );
    }
}

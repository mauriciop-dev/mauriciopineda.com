import { Resend } from "resend";

interface Env {
  RESEND_API_KEY: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      const { name, email, message, page } = await request.json();

      const resend = new Resend(env.RESEND_API_KEY);

      await Promise.all([
        resend.emails.send({
          from: "Web Personal <contacto@paicai.com.co>",
          to: ["hmauricio.pineda@gmail.com"],
          subject: `[${page || "Web"}] Nuevo mensaje de ${name}`,
          html: `
            <h2>Nuevo mensaje desde mauriciopineda.com</h2>
            <p><strong>De:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong> Página:</strong> ${page || "General"}</p>
            <hr>
            <p><strong>Mensaje:</strong></p>
            <p>${message}</p>
          `,
          reply_to: email,
        }),
        resend.emails.send({
          from: "Mauricio Pineda <contacto@paicai.com.co>",
          to: [email],
          subject: "Confirmación de recibido - Mensaje enviado",
          html: `
            <h2>¡Gracias por contactarme!</h2>
            <p>Hola ${name},</p>
            <p>He recibido tu mensaje correctamente. Estoy revisando tu comunicación y pronto me pondré en contacto contigo.</p>
            <hr>
            <p><strong>Tu mensaje:</strong></p>
            <p>${message}</p>
            <hr>
            <p>Saludos,<br>Mauricio Pineda</p>
            <p><a href="https://mauriciopineda.com">mauriciopineda.com</a></p>
          `,
        }),
      ]);

      return Response.json({ success: true }, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      return Response.json({ error: error.message }, { status: 500, headers: {
        "Access-Control-Allow-Origin": "*",
      } });
    }
  },
} satisfies ExportedHandler<Env>;
import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // o el servicio que estés usando
  auth: {
    user: "ezequielezequiel9@gmail.com",
    pass: "yrax mnig bkxz hjwm",
  },
});

// Función para validar email
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export async function sendEmail(email, code) {
  if (!email || !isValidEmail(email)) {
    return {
      success: false,
      message: "Debe proporcionar un email válido",
    };
  } else {
    return await transporter.sendMail({
      to: email,
      subject: "Tu código para ingresar",
      text: `Tu código para ingresar es: ${code}`,
    });
  }
}

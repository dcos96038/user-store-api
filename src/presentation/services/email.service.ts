import nodemailer, { type Transporter } from 'nodemailer'

export interface SendMailOptions {
  to: string | string[]
  subject: string
  htmlBody: string
  attachements?: Attachement[]
}

export interface Attachement {
  filename: string
  path: string
}

export class EmailService {
  private readonly transporter: Transporter

  constructor (public readonly service: string, public readonly email: string, public readonly secretKey: string) {
    this.transporter = nodemailer.createTransport({
      service,
      auth: {
        user: email,
        pass: secretKey
      }
    })
  }

  async sendEmail (options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachements = [] } = options

    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments: attachements
      })

      console.log(sentInformation)

      return true
    } catch (error) {
      return false
    }
  }
}

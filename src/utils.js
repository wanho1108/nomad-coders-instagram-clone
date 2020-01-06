import dotenv from 'dotenv';
import path from 'path';
import { adjectives, nouns } from "./words";
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export const sendMail = (email) => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_USERPASSWORD
    }
  }
};

export const sendSecretMail = (address, screct) => {
  const email = {
    from: 'wanho1108@gmail.com',
    to: address,
    subject: 'Login Secret for Instagram',
    html: `Hello! Your login secret it ${screct}.<br>Copy paste on the app/website to login`
  }
};
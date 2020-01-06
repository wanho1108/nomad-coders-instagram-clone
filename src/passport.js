import dotenv from 'dotenv';
import path from 'path';
import passport from 'passport';
import JwtStrategy from 'passport-jwt';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const jwtOptions = {
  jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secret: process.env.JWT_SECRET
};

const verifyUser = (payload, done) {

}

passport.use(new JwtStrategy(jwtOptions, verifyUser));
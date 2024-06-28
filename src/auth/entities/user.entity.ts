import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  //! Prop es como Column cuando usamos postgres

  // _id: string, mongo coloca esto automáticamente
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: [String], default: ['user'] })
  roles: string[];
}

//proporcionamos el esquema para poder definirlo en la base de datos
export const UserSchema = SchemaFactory.createForClass(User);
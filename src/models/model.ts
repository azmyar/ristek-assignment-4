import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Articles = {
    id: Generated<number>;
    title: string;
    content: string;
    updatedAt: Generated<Timestamp>;
    createdAt: Generated<Timestamp>;
    tags: string[];
    creatorId: Generated<number>;
};
export type Profile = {
    id: Generated<number>;
    firstName: string;
    lastName: string;
    userId: number;
};
export type User = {
    id: Generated<number>;
    email: string;
    username: string;
    password: string;
};
export type DB = {
    Articles: Articles;
    Profile: Profile;
    User: User;
};

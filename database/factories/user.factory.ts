import { User } from 'modules/user/user.entity';
import { define } from 'typeorm-seeding';
import { Faker } from '@faker-js/faker';
import { hash, rand } from 'common/util';

define(User, (faker: Faker) => {
    const user = new User();

    user.name = `${faker.name.firstName()} ${faker.name.lastName()}`;
    user.email =
        faker.name.firstName().toLowerCase() + rand(1, 1000) + '@gmail.com';
    user.password = hash('12345');

    return user;
});

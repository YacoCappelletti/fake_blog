import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

import * as fs from 'fs';
import Image from 'next/image';

const usersJsonData: string = fs.readFileSync('./data/users.json', 'utf-8');
const postsJsonData: string = fs.readFileSync('./data/posts.json', 'utf-8');
const commentsJsonData: string = fs.readFileSync(
    './data/comments.json',
    'utf-8'
);
const usersData: any = JSON.parse(usersJsonData);
const postsData: any = JSON.parse(postsJsonData);
const commentsData: any = JSON.parse(commentsJsonData);

const prisma = new PrismaClient();

async function main() {
    const users: any = [];

    for (let i = 0; i < usersData.length; i++) {
        const user = await prisma.user.create({
            data: {
                firstName: usersData[i].firstName,
                lastName: usersData[i].lastName,
                maidenName: usersData[i].maidenName,
                age: usersData[i].age,
                gender: usersData[i].gender,
                email: usersData[i].email,
                phone: usersData[i].phone,
                username: usersData[i].username,
                password: await hash(usersData[i].password, 12),
                birthDate: usersData[i].birthDate,
                image: usersData[i].image,
            },
        });
        users.push(user);
    }

    const posts: any = [];
    for (let i = 0; i < postsData.length; i++) {
        const post = await prisma.post.create({
            data: {
                title: postsData[i].title,
                body: postsData[i].body,
                userId: postsData[i].userId,
                likes: postsData[i].reactions,
                image: `https://picsum.photos/id/${i + 120}/500/300`,
            },
        });
        posts.push(post);
    }

    const comments: any = [];
    for (let i = 0; i < commentsData.length; i++) {
        const comment = await prisma.comment.create({
            data: {
                body: commentsData[i].body,
                postId: commentsData[i].postId,
                userId: commentsData[i].user.id,
            },
        });
        comments.push(comment);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

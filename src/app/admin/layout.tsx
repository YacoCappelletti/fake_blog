import Link from 'next/link';
export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full">
            <div className="bg-gray-500 w-full h-[2rem] flex flex-row justify-around">
                <Link className="text-white text-[1.3rem]" href="/admin/posts">
                    Posts
                </Link>
                <Link className="text-white text-[1.3rem]" href="/admin/users">
                    Users
                </Link>
                <Link
                    className="text-white text-[1.3rem]"
                    href="/admin/messages"
                >
                    Messages
                </Link>
            </div>

            <section className="flex justify-center">{children}</section>

            
        </div>
    );
}

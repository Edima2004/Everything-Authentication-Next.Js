import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
	children: React.ReactNode;
}
async function ProtectedLayout({ children }: ProtectedLayoutProps) {
	//const session = await auth();
	return (
		<div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-sky-500">
         <Navbar/>
			{children}
		</div>
	);
}
export default ProtectedLayout;

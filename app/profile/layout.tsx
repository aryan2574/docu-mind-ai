import { auth } from "@clerk/nextjs/server";
import { SignedOutRedirect } from "@/app/chat/signed-out-redirect";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await auth.protect();

  return <SignedOutRedirect>{children}</SignedOutRedirect>;
}
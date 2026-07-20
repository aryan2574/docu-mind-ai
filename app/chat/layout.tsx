import { auth } from "@clerk/nextjs/server";
import { SignedOutRedirect } from "./signed-out-redirect";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await auth.protect();

  return <SignedOutRedirect>{children}</SignedOutRedirect>;
}

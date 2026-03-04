import { ShareInFrame } from "@/components/share-bar";

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div id="guides-share-scope">{children}</div>
      <ShareInFrame scopeId="guides-share-scope" />
    </>
  );
}

import Image from "next/image";

export default function PrintChecklistHeader() {
  return (
    <div className="hidden print:block print:-mt-4 print:mb-1">
      <div className="flex items-center justify-center pb-1">
        <div className="flex items-center">
          <Image
            src="/logo-full.svg"
            alt="Thai Visa Checklist"
            width={220}
            height={30}
            className="h-auto w-[180px]"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
}

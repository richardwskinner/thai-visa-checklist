export default function PrintChecklistHeader() {
  return (
    <div className="hidden print:block print:-mt-4 print:mb-1">
      <div className="flex items-center justify-center pb-1">
        <div className="flex items-center">
          <img
            src="/logo-full.svg"
            alt="Thai Visa Checklist Logo"
            width={220}
            height={30}
            loading="eager"
            decoding="sync"
            className="h-auto w-[180px]"
          />
        </div>
      </div>
    </div>
  );
}

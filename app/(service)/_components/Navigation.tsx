"use client";

const Navigation = () => {
  return (
    <>
      <aside
        className="h-full overflow-y-auto group bg-secondary
      relative w-60 flex flex-col z-[99999]
      "
      >
        <div>
          <p>Action</p>
        </div>
        <div className="mt-4">
          <p>Documents</p>
        </div>
        <div className="absolute top-0 right-0 w-1 h-full transition opacity-0 group-hover:opacity-100 cursor-ew-resize bg-primary/10" />
      </aside>
    </>
  );
};

export default Navigation;

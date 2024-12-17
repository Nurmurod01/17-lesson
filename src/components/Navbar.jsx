export default function Navbar() {
  return (
    <div className="flex justify-center">
      <div className="navbar bg-base-200 w-[75%] flex justify-between max-[800px]:flex-col">
        <div>
          <a className="btn btn-ghost text-[24px] w-[280px] h-[33px]">
            Where in the world?
          </a>
        </div>
        <div className="">
          <a className="btn text-md">Dark Mode</a>
        </div>
      </div>
    </div>
  );
}

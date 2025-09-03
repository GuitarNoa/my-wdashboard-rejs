import Sidebar from "../components/Sidebar";
// import Breadcrumb from "../components/Breadcrumb";

export default function DefaultLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 md:ml-64 p-4">
        {/* Breadcrumb / Header */}
        {/* <header className="bg-white shadow-sm p-4"> */}
          {/* <Breadcrumb /> */}
        {/* </header> */}

        {/* Page Content */}
        <main className="bg-gray-50">{children}</main>
      </div>
    </div>
  );
}

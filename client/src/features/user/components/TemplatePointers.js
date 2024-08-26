import { upperCaseFirst } from "upper-case-first";
function TemplatePointers() {
  const role = localStorage.getItem("role");
  return (
    <>
      <h1 className="text-2xl mt-8 font-bold">{upperCaseFirst(role)} Login</h1>
    </>
  );
}

export default TemplatePointers;

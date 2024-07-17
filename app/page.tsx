"use client";
import { BusinessCardProvider } from "./components/businesscard/bussiness";
import Form from "./components/Form";
import { LogoProvider } from "./components/logocontext";

export default function Home() {
  return (
    <main>
          

         <BusinessCardProvider>

<LogoProvider>
<Form />
</LogoProvider>
</BusinessCardProvider>
    </main>
  );
}

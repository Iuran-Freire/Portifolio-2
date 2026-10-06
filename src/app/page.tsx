import { redirect } from "next/navigation";

export default function Home() {
  // Encaminha o endereço principal para o idioma português.
  redirect("/pt");
}

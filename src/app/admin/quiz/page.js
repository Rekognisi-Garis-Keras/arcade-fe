import QuizTable from "@/components/Admin/Quiz/QuizTable";
import AdminGuard from "@/utils/adminGuard";

export default function AdminQuiz() {
  return (
    <AdminGuard>
      <QuizTable />
    </AdminGuard>
  );
}

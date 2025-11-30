import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { Plus, Book } from "lucide-react"

import DashboardLayout from "../components/layout/DashboardLayout"
import Button from "../components/ui/Button"
import { useAuth } from "../context/AuthContext"
import axiosInstance from "../utils/axiosInstance"
import { API_PATHS } from "../utils/apiPaths"

const DashboardPage = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const { user } = useAuth();
const navigate = useNavigate();

useEffect(() => {
  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.BOOKS.GET_BOOKS);
      setBooks(response.data);
    } catch (error) {
      toast.error("Failed to fetch your eBooks");
    }finally{
      setIsLoading(false);
    }
  };
  fetchBooks();
}, []);

const handleDeleteBook = async () => {
  if(!bookToDelete) return;

};

const handleCreateBookClick = () => {
  setIsCreateModalOpen(true);
};

const handleBookCreated = (bookId) =>{
  setIsCreateModalOpen(false);
  navigate(`/editor/${bookId}`);
}

  return (
   <DashboardLayout>
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-lg font-bold text-slate-900">All eBooks</h1>
          <p className="text-[13px] text-slate-600 mt-1">Create, edit and Manage all your AI-generated eBooks</p>
        </div>
        <Button className="whitespace-nowrap" onClick={handleCreateBookClick} icon={Plus}>Create New Book</Button>
      </div>
    </div>
   </DashboardLayout>
  )
}

export default DashboardPage

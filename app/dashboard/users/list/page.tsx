"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  DataTable,
  Loading,
  ConfirmDialog,
  Button,
  Modal,
  UserForm,
  TextInput,
} from "@/components";
import axios from "axios";

type User = {
  id: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export default function UsersListPage() {
  const router = useRouter();
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(
    null
  );
  const [deleting, setDeleting] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [editingUserId, setEditingUserId] = React.useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("/api/users");
      if (response.data?.users) {
        setUsers(response.data.users);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      const errorMessage =
        axios.isAxiosError(err) && err.response?.data?.error
          ? err.response.data.error
          : err instanceof Error
          ? err.message
          : "Failed to load users";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatRole = (role: string) => {
    return role === "superAdmin" ? "Super Admin" : "Admin";
  };

  const handleEdit = (idx: number) => {
    const user = users[idx];
    if (user) {
      setEditingUserId(user.id);
      setEditModalOpen(true);
    }
  };

  const handleEditSuccess = () => {
    setEditModalOpen(false);
    setEditingUserId(null);
    fetchUsers();
  };

  const handleEditCancel = () => {
    setEditModalOpen(false);
    setEditingUserId(null);
  };

  const handleDelete = (idx: number) => {
    const user = users[idx];
    if (user) {
      setSelectedUserId(user.id);
      setDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedUserId) return;

    setDeleting(true);
    try {
      await axios.delete(`/api/users/${selectedUserId}`);
      setDeleteDialogOpen(false);
      setSelectedUserId(null);
      // Refresh users list
      await fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      const errorMessage =
        axios.isAxiosError(err) && err.response?.data?.error
          ? err.response.data.error
          : err instanceof Error
          ? err.message
          : "Failed to delete user";
      alert(errorMessage);
    } finally {
      setDeleting(false);
    }
  };

  const columns = ["Email", "Password", "Role", "Created At"];

  const data = users.map((user) => [
    user.email,
    (
      <TextInput
        key={`password-${user.id}`}
        type="password"
        value="••••••••"
        disabled
        onChange={() => {}}
        className="m-0"
        inputClassName="w-24 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 cursor-not-allowed"
      />
    ) as React.ReactElement,
    formatRole(user.role),
    formatDate(user.createdAt),
  ]);

  if (loading) {
    return <Loading fullScreen />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-600 dark:text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Users</h2>
        <Button
          variant="primary"
          onClick={() => router.push("/dashboard/users")}
        >
          Add New User
        </Button>
      </div>

      <DataTable
        title="All Users"
        columns={columns}
        data={data}
        enableSelection={false}
        onEditRow={handleEdit}
        onDeleteRow={handleDelete}
      />

      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSelectedUserId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        description={`Are you sure you want to delete this user? This action cannot be undone.`}
        confirmText={deleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
      />

      <Modal
        isOpen={editModalOpen}
        onClose={handleEditCancel}
        title="Edit User"
        widthClassName="max-w-2xl"
      >
        <UserForm
          userId={editingUserId || undefined}
          onSuccess={handleEditSuccess}
          onCancel={handleEditCancel}
        />
      </Modal>
    </div>
  );
}

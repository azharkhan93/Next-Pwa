"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, TextInput, Dropdown, FormError } from "@/components";
import axios from "axios";

type UserFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

const initialFormData: UserFormData = {
  email: "",
  password: "",
  confirmPassword: "",
  role: "admin",
};

const roleOptions = [
  { label: "Admin", value: "admin" },
  { label: "Super Admin", value: "superAdmin" },
];

type UserFormProps = {
  userId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function UserForm({ userId, onSuccess, onCancel }: UserFormProps) {
  const router = useRouter();
  const [formData, setFormData] = React.useState<UserFormData>(initialFormData);
  const [loading, setLoading] = React.useState(false);
  const [fetching, setFetching] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const isEditMode = !!userId;

  // Fetch user data when in edit mode
  React.useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        setFetching(true);
        setError(null);
        try {
          const response = await axios.get("/api/users");
          if (response.data?.users) {
            const user = response.data.users.find(
              (u: { id: string }) => u.id === userId
            );
            if (user) {
              setFormData({
                email: user.email || "",
                password: "",
                confirmPassword: "",
                role: user.role || "admin",
              });
            } else {
              setError("User not found");
            }
          }
        } catch (err) {
          console.error("Error fetching user:", err);
          const errorMessage =
            axios.isAxiosError(err) && err.response?.data?.error
              ? err.response.data.error
              : err instanceof Error
              ? err.message
              : "Failed to load user";
          setError(errorMessage);
        } finally {
          setFetching(false);
        }
      };
      fetchUser();
    } else {
      // Reset form when not in edit mode
      setFormData(initialFormData);
    }
  }, [userId]);

  const handleChange =
    (field: keyof UserFormData) =>
    (e: React.ChangeEvent<HTMLInputElement> | string) => {
      if (typeof e === "string") {
        // For dropdown
        setFormData((prev) => ({ ...prev, [field]: e }));
        setError(null);
      } else {
        // For text input
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        setError(null);
      }
    };

  const validateForm = (): boolean => {
    if (!formData.email) {
      setError("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format");
      return false;
    }

    // Password is required for add mode, optional for edit mode
    if (!isEditMode) {
      if (!formData.password) {
        setError("Password is required");
        return false;
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long");
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return false;
      }
    } else {
      // For edit mode, password is optional but if provided, must be valid
      if (formData.password) {
        if (formData.password.length < 6) {
          setError("Password must be at least 6 characters long");
          return false;
        }

        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          return false;
        }
      }
    }

    if (!formData.role) {
      setError("Role is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (isEditMode && userId) {
        // Update user
        const updateData: {
          email: string;
          password?: string;
          role: string;
        } = {
          email: formData.email,
          role: formData.role,
        };

        // Only include password if it's provided
        if (formData.password) {
          updateData.password = formData.password;
        }

        const response = await axios.patch(`/api/users/${userId}`, updateData);

        if (response.data) {
          setSuccess(true);
          setFormData(initialFormData);
          if (onSuccess) {
            setTimeout(() => {
              onSuccess();
            }, 1000);
          } else {
            setTimeout(() => {
              router.push("/dashboard/users/list");
            }, 1500);
          }
        }
      } else {
        // Create user
        const response = await axios.post("/api/users", {
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });

        if (response.data) {
          setSuccess(true);
          setFormData(initialFormData);
          if (onSuccess) {
            setTimeout(() => {
              onSuccess();
            }, 1000);
          } else {
            setTimeout(() => {
              router.push("/dashboard/users/list");
            }, 1500);
          }
        }
      }
    } catch (err: unknown) {
      console.error(`Error ${isEditMode ? "updating" : "creating"} user:`, err);
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as { response?: { data?: { error?: string } } };
        setError(
          axiosErr.response?.data?.error ||
            `Failed to ${
              isEditMode ? "update" : "create"
            } user. Please try again.`
        );
      } else {
        setError(
          `Failed to ${
            isEditMode ? "update" : "create"
          } user. Please try again.`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-600">
          Loading user data...
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange("email")}
            placeholder="user@example.com"
            required
            autoComplete="email"
          />

          <Dropdown
            id="role"
            name="role"
            label="Role"
            value={formData.role}
            onChange={handleChange("role")}
            options={roleOptions}
            placeholder="Select role"
          />

          <TextInput
            id="password"
            name="password"
            label={
              isEditMode ? "Password (leave blank to keep current)" : "Password"
            }
            type="password"
            value={formData.password}
            onChange={handleChange("password")}
            placeholder={
              isEditMode
                ? "Enter new password (min 6 characters)"
                : "Enter password (min 6 characters)"
            }
            required={!isEditMode}
            autoComplete="new-password"
          />

          <TextInput
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange("confirmPassword")}
            placeholder="Confirm password"
            required={!isEditMode}
            autoComplete="new-password"
          />
        </div>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            ✅ User {isEditMode ? "updated" : "created"} successfully!{" "}
            {onSuccess ? "Closing..." : "Redirecting..."}
          </p>
        </div>
      )}

      <FormError message={error ?? undefined} />

      <div className="flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="outlined"
          onClick={() => {
            if (onCancel) {
              onCancel();
            } else {
              router.back();
            }
          }}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary" loading={loading}>
          {isEditMode ? "Update User" : "Create User"}
        </Button>
      </div>
    </form>
  );
}

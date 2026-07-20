"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toast } from "@/components/ui/toast";
import { useUser } from "@clerk/nextjs";
import { useAuthRole } from "@/hooks/use-auth-role";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Shield, Crown, Star, Loader2, Edit3, Check, X, Camera, Upload } from "lucide-react";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const { userRole, hasUploadAccess, isAdmin, isPremiumUser } = useAuthRole();
  const [isEditingName, setIsEditingName] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const { toast, toasts, dismiss } = useToast();
  const firstNameRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingName && firstNameRef.current) {
      firstNameRef.current.focus();
      firstNameRef.current.select();
    }
  }, [isEditingName]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-5 w-5" />;
      case "premium-user":
        return <Star className="h-5 w-5" />;
      case "user":
      default:
        return <User className="h-5 w-5" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "premium-user":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "user":
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPermissions = () => {
    const permissions = ["Access to AI Chat"];
    if (hasUploadAccess) {
      permissions.push("Upload PDF Documents");
    }
    if (isAdmin) {
      permissions.push("Administrative Access");
    }
    return permissions;
  };

  const handleEditName = () => {
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setIsEditingName(true);
  };

  const handleSaveName = async () => {
    if (!user || (!firstName.trim() && !lastName.trim())) return;

    setIsSaving(true);
    try {
      await user.update({
        firstName: firstName.trim() || undefined,
        lastName: lastName.trim() || undefined,
      });
      setIsEditingName(false);
      toast({
        variant: "success",
        title: "Name updated",
        description: "Your name has been successfully updated.",
      });
    } catch (error) {
      console.error("Failed to update name:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Failed to update your name. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setFirstName("");
    setLastName("");
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "Invalid file",
        description: "Please select a valid image file.",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Image must be less than 5MB.",
      });
      return;
    }

    setIsUploadingImage(true);
    try {
      await user.setProfileImage({ file });
      toast({
        variant: "success",
        title: "Image updated",
        description: "Your profile image has been successfully updated.",
      });
    } catch (error) {
      console.error("Failed to update image:", error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "Failed to update your profile image. Please try again.",
      });
    } finally {
      setIsUploadingImage(false);
      // Clear the file input
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    }
  };

  const triggerImageUpload = () => {
    imageInputRef.current?.click();
  };

  return (
    <div className="min-h-screen py-8">
      {/* Toast notifications */}
      <div className="fixed top-20 right-4 z-40 space-y-2">
        {toasts.map((t) => (
          <Toast key={t.id} variant={t.variant} onClose={() => dismiss(t.id)}>
            <div className="grid gap-1">
              {t.title && <div className="text-sm font-semibold">{t.title}</div>}
              <div className="text-sm opacity-90">{t.description}</div>
            </div>
          </Toast>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold gradient-text mb-4">Your Profile</h1>
          <p className="text-muted-foreground text-lg">Manage your account information and view your access permissions.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* User Information Card */}
          <Card className={`card-academic ${isEditingName ? "ring-2 ring-primary ring-opacity-50" : ""}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <User className="h-6 w-6 text-primary" />
                </div>
                User Information
                {isEditingName && (
                  <span className="text-sm font-normal text-primary">(editing)</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Image Section */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="h-20 w-20 rounded-full bg-gray-200 overflow-hidden">
                    {user?.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-100">
                        <User className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <Button
                    size="sm"
                    onClick={triggerImageUpload}
                    disabled={isUploadingImage}
                    className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full p-0"
                  >
                    {isUploadingImage ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Camera className="h-3 w-3" />
                    )}
                  </Button>
                </div>
                <div className="flex-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={triggerImageUpload}
                    disabled={isUploadingImage}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    {isUploadingImage ? "Uploading..." : "Change Photo"}
                  </Button>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG or GIF. Max size 5MB.
                  </p>
                </div>
              </div>

              {/* Hidden file input for image upload */}
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {/* Name Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Name</span>
                </div>
                
                {isEditingName ? (
                  <div className="space-y-3 ml-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="firstName" className="text-sm text-gray-600">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          ref={firstNameRef}
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Enter first name"
                          className="mt-1"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSaveName();
                            if (e.key === "Escape") handleCancelEdit();
                          }}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-sm text-gray-600">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Enter last name"
                          className="mt-1"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSaveName();
                            if (e.key === "Escape") handleCancelEdit();
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={handleSaveName}
                        disabled={isSaving || (!firstName.trim() && !lastName.trim())}
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="h-3 w-3 animate-spin mr-1" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Check className="h-3 w-3 mr-1" />
                            Save Changes
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancelEdit}
                        disabled={isSaving}
                      >
                        <X className="h-3 w-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 ml-6">
                    <p className="font-medium text-gray-900">
                      {user?.fullName || 
                       (user?.firstName || user?.lastName ? `${user?.firstName || ''} ${user?.lastName || ''}`.trim() : "No name set")}
                    </p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleEditName}
                      className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                    >
                      <Edit3 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                <p className="text-sm text-gray-500 ml-6">
                  Member since {user?.createdAt?.toLocaleDateString()}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Email</span>
                </div>
                <p className="text-gray-900 ml-6">
                  {user?.primaryEmailAddress?.emailAddress || "No email set"}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Role</span>
                </div>
                <div className="ml-6">
                  <Badge className={`${getRoleColor(userRole)} flex items-center gap-1 w-fit`}>
                    {getRoleIcon(userRole)}
                    {userRole.replace('-', ' ').toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Permissions Card */}
          <Card className="card-academic">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Shield className="h-6 w-6 text-accent-foreground" />
                </div>
                Access Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getPermissions().map((permission, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{permission}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Role Benefits</h4>
                <div className="space-y-1 text-sm text-blue-800">
                  {isAdmin && (
                    <p>• Full administrative access to all features</p>
                  )}
                  {isPremiumUser && (
                    <p>• Premium access including document upload</p>
                  )}
                  {!hasUploadAccess && (
                    <p>• Contact admin to upgrade for document upload access</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Status Card */}
          <Card className="md:col-span-2 card-academic">
            <CardHeader>
              <CardTitle className="text-center gradient-text">Account Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">Active</div>
                  <div className="text-sm text-green-700">Account Status</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 capitalize">{userRole.replace('-', ' ')}</div>
                  <div className="text-sm text-blue-700">Current Role</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {hasUploadAccess ? "Premium" : "Basic"}
                  </div>
                  <div className="text-sm text-purple-700">Feature Access</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
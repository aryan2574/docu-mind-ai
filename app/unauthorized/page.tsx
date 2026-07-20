import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-red-500" />
            </div>
            <CardTitle className="text-2xl text-gray-900">Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertDescription>
                You don't have permission to access this feature. The PDF upload feature is only available for Premium Users and Administrators.
              </AlertDescription>
            </Alert>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-4">
                To access this feature, you need to have either:
              </p>
              <ul className="list-disc list-inside text-left max-w-md mx-auto mb-6 space-y-2">
                <li><strong>Premium User</strong> - Upgrade your account</li>
                <li><strong>Administrator</strong> - Contact support</li>
              </ul>
              
              <Link 
                href="/" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Return Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
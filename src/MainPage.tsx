import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, FileText, Zap, Users, TrendingUp } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export const MainPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen h-screen">
      <main className="flex-1">
        <section className="flex flex-col items-center w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-900 dark:text-white">
                Tailor Your Resume with AI
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Get more interviews with a resume perfectly tailored to each job description using our advanced AI technology. 100% Free.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="space-x-2">
                <Button onClick={() => navigate("/tailor")} type="submit" className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Start optimizing your resume now. 
              </p>
            </div>
          </div>
        </section>
        <section id="features" className="flex flex-col items-center w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900 dark:text-white">Key Features</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                <Zap className="h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">AI-Powered Analysis</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">Our AI analyzes job descriptions and your resume to provide tailored suggestions.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                <FileText className="h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Multiple Format Support</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">Upload your resume in PDF, DOCX, or TXT formats for instant analysis.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                <CheckCircle className="h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Keyword Optimization</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">Ensure your resume includes all the right keywords for ATS systems.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                <Users className="h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Unlimited Usage</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">Tailor your resume for as many job applications as you want, completely free.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                <TrendingUp className="h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Performance Tracking</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">Monitor your application success rate and improve over time.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                <ArrowRight className="h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Continuous Improvement</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">Our AI constantly learns and improves to provide better suggestions.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="flex flex-col items-center w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900 dark:text-white">How It Works</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold">1</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Upload Your Resume</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">Upload your current resume in PDF, DOCX, or TXT format.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold">2</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Paste Job Description</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">Copy and paste the job description you're applying for.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold">3</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Get AI Suggestions</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">Receive tailored suggestions to improve your resume for the specific job.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="faq" className="flex flex-col items-center w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">How does AI Resume Tailor work?</h3>
                <p className="text-gray-500 dark:text-gray-400">Our AI analyzes your resume and compares it to the job description you provide. It then suggests improvements to increase your chances of getting an interview.</p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Can AI Resume Tailor help with cover letters?</h3>
                <p className="text-gray-500 dark:text-gray-400">Yes, AI Resume Tailor can also provide suggestions for improving your cover letters. By analyzing the job description and your resume, our AI can help you craft a compelling cover letter that complements your application.</p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Is AI Resume Tailor really free?</h3>
                <p className="text-gray-500 dark:text-gray-400">Yes, AI Resume Tailor is completely free to use. There are no hidden charges or premium features.</p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">How many times can I use AI Resume Tailor?</h3>
                <p className="text-gray-500 dark:text-gray-400">You can use AI Resume Tailor as many times as you want. There are no limits on the number of resumes you can optimize or job descriptions you can analyze.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center w-full py-12 md:py-24 lg:py-32 bg-blue-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-white">Ready to Optimize Your Resume?</h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join thousands of job seekers who have improved their chances of landing their dream job.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="space-x-2">
                  <Button onClick={() => navigate("/tailor")} type="submit" className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Start optimizing your resume now. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col justify-center gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Tailor.dev. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default MainPage;
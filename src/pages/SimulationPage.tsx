import React from 'react';
import Layout from '../components/layout/Layout';
import LaserSimulation from '../components/simulations/LaserSimulation';
import ModePatternSimulation from '../components/simulations/ModePatternSimulation';
import ApplicationSimulation from '../components/simulations/ApplicationSimulation';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Lightbulb, Zap, Activity } from 'lucide-react';

const SimulationPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Laser Simulation Lab
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Experiment with virtual laser systems and observe how different parameters affect laser behavior.
          </p>
        </div>
        
        <div className="mb-8">
          <Tabs defaultValue="cavity">
            <TabsList className="mb-6">
              <TabsTrigger value="cavity" className="flex items-center">
                <Lightbulb className="mr-2 h-4 w-4" />
                Laser Cavity
              </TabsTrigger>
              <TabsTrigger value="modes" className="flex items-center">
                <Activity className="mr-2 h-4 w-4" />
                Mode Patterns
              </TabsTrigger>
              <TabsTrigger value="applications" className="flex items-center">
                <Zap className="mr-2 h-4 w-4" />
                Applications
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="cavity">
              <LaserSimulation />
            </TabsContent>
            
            <TabsContent value="modes">
              <ModePatternSimulation />
            </TabsContent>
            
            <TabsContent value="applications">
              <ApplicationSimulation />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Simulation Theory</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This simulation demonstrates the basic principles of laser operation, including:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Stimulated emission in the gain medium</li>
                <li>Optical feedback from cavity mirrors</li>
                <li>Wavelength selection and mode formation</li>
                <li>Threshold behavior and output coupling</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Key Equations</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white mb-1">Resonant Frequencies:</p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                    <code className="text-sm">f = c / (2L) * q</code>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Where c is speed of light, L is cavity length, q is mode number
                  </p>
                </div>
                
                <div>
                  <p className="font-medium text-gray-900 dark:text-white mb-1">Threshold Condition:</p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                    <code className="text-sm">R₁R₂exp(2gL) = 1</code>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Where R₁,R₂ are mirror reflectivities, g is gain coefficient
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Learning Objectives</h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Understand how cavity length affects mode spacing</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Observe how pump power influences laser output</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Explore the relationship between mirror reflectivity and threshold</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Visualize how different gain media produce different wavelengths</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SimulationPage;
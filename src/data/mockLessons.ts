import { Lesson } from '../types';

export const mockLessons: Lesson[] = [
  {
    id: 'unit-1-absorption-emission',
    title: 'Unit I: Absorption and Emission of Radiation',
    description: 'Master the fundamental concepts of light-matter interaction, including coherence, spontaneous and stimulated emission, and population inversion.',
    difficulty: 'beginner',
    concepts: ['coherence', 'spontaneous emission', 'stimulated emission', 'population inversion', 'Einstein coefficients'],
    duration: 45,
    points: 100,
    prerequisites: [],
    content: {
      sections: [
        {
          id: 'coherence-concepts',
          title: 'Coherence Concepts',
          content: `
            <h2>Spatial and Temporal Coherence</h2>
            <p>Coherence is a fundamental property of laser light that distinguishes it from ordinary light sources. There are two types of coherence:</p>
            
            <h3>Spatial Coherence</h3>
            <p>Spatial coherence describes the correlation between light waves at different points in space. In a laser:</p>
            <ul>
              <li>Waves maintain a fixed phase relationship across the beam profile</li>
              <li>Results in highly directional and collimated beam</li>
              <li>Enables tight focusing and long-distance propagation</li>
            </ul>
            
            <h3>Temporal Coherence</h3>
            <p>Temporal coherence relates to how monochromatic (single-wavelength) the light is:</p>
            <ul>
              <li>Describes correlation between waves at different points in time</li>
              <li>Determines the laser's spectral purity</li>
              <li>Affects the laser's ability to produce interference patterns</li>
            </ul>
          `,
          imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          interactive: {
            type: 'simulation',
            data: {
              simulationType: 'coherence',
              parameters: ['wavelength', 'phase', 'amplitude']
            }
          }
        },
        {
          id: 'spontaneous-stimulated-emission',
          title: 'Spontaneous vs. Stimulated Emission',
          content: `
            <h2>Light-Matter Interaction Mechanisms</h2>
            
            <h3>Spontaneous Emission</h3>
            <p>When an atom in an excited state spontaneously decays to a lower energy level:</p>
            <ul>
              <li>Random direction of emitted photon</li>
              <li>Random phase of emitted light</li>
              <li>Transition occurs without external influence</li>
              <li>Natural lifetime determines decay rate</li>
            </ul>
            
            <h3>Stimulated Emission</h3>
            <p>When an incident photon triggers the emission of another photon:</p>
            <ul>
              <li>Emitted photon has same direction as incident photon</li>
              <li>Phase coherence between incident and emitted photon</li>
              <li>Same frequency and polarization</li>
              <li>Forms basis for laser amplification</li>
            </ul>
            
            <h3>Key Differences</h3>
            <table class="w-full border-collapse border border-gray-300 dark:border-gray-700 mt-4">
              <thead>
                <tr class="bg-gray-100 dark:bg-gray-800">
                  <th class="border border-gray-300 dark:border-gray-700 p-2">Property</th>
                  <th class="border border-gray-300 dark:border-gray-700 p-2">Spontaneous Emission</th>
                  <th class="border border-gray-300 dark:border-gray-700 p-2">Stimulated Emission</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border border-gray-300 dark:border-gray-700 p-2">Direction</td>
                  <td class="border border-gray-300 dark:border-gray-700 p-2">Random</td>
                  <td class="border border-gray-300 dark:border-gray-700 p-2">Same as incident photon</td>
                </tr>
                <tr>
                  <td class="border border-gray-300 dark:border-gray-700 p-2">Phase</td>
                  <td class="border border-gray-300 dark:border-gray-700 p-2">Random</td>
                  <td class="border border-gray-300 dark:border-gray-700 p-2">In phase with incident photon</td>
                </tr>
                <tr>
                  <td class="border border-gray-300 dark:border-gray-700 p-2">External Trigger</td>
                  <td class="border border-gray-300 dark:border-gray-700 p-2">Not required</td>
                  <td class="border border-gray-300 dark:border-gray-700 p-2">Required</td>
                </tr>
              </tbody>
            </table>
          `,
          imageUrl: 'https://images.unsplash.com/photo-1607988795691-3d0147b43231?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 'population-inversion',
          title: 'Population Inversion',
          content: `
            <h2>Population Inversion and Pumping Mechanisms</h2>
            
            <p>Population inversion is a state where more atoms are in an excited state than in a lower energy state. This condition is necessary for laser operation.</p>
            
            <h3>Requirements for Population Inversion</h3>
            <ul>
              <li>Multiple energy levels (at least three or four)</li>
              <li>Efficient pumping mechanism</li>
              <li>Appropriate lifetime of energy levels</li>
              <li>Sufficient energy input</li>
            </ul>
            
            <h3>Pumping Mechanisms</h3>
            <p>Several methods can achieve population inversion:</p>
            
            <h4>1. Optical Pumping</h4>
            <ul>
              <li>Uses intense light source (flash lamps, LEDs, other lasers)</li>
              <li>Common in solid-state lasers</li>
              <li>Example: Ruby laser</li>
            </ul>
            
            <h4>2. Electrical Pumping</h4>
            <ul>
              <li>Direct electrical excitation</li>
              <li>Used in gas lasers and semiconductor lasers</li>
              <li>Example: He-Ne laser</li>
            </ul>
            
            <h4>3. Chemical Pumping</h4>
            <ul>
              <li>Energy from chemical reactions</li>
              <li>High-power output possible</li>
              <li>Example: Chemical oxygen-iodine laser</li>
            </ul>
            
            <h3>Rate Equations</h3>
            <p>The dynamics of population inversion are described by rate equations:</p>
            <pre><code>dN₂/dt = Pumping Rate - Spontaneous Emission Rate - Stimulated Emission Rate
dN₁/dt = -Pumping Rate + Spontaneous Emission Rate + Stimulated Emission Rate</code></pre>
            
            <p>Where:</p>
            <ul>
              <li>N₂: Population of upper energy level</li>
              <li>N₁: Population of lower energy level</li>
              <li>t: Time</li>
            </ul>
          `,
          imageUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          interactive: {
            type: 'simulation',
            data: {
              simulationType: 'population-inversion',
              parameters: ['pumpPower', 'lifetime', 'crossSection']
            }
          }
        }
      ],
      quiz: {
        id: 'unit-1-quiz',
        lessonId: 'unit-1-absorption-emission',
        questions: [
          {
            id: 'q1',
            text: 'Which of the following best describes spatial coherence?',
            options: [
              'The correlation between light waves at different points in space',
              'The correlation between light waves at different points in time',
              'The random emission of photons in all directions',
              'The absorption of photons by atoms'
            ],
            correctAnswer: 0,
            explanation: 'Spatial coherence describes the correlation between light waves at different points in space, which results in the highly directional nature of laser light.'
          },
          {
            id: 'q2',
            text: 'What is the key difference between spontaneous and stimulated emission?',
            options: [
              'Spontaneous emission requires more energy',
              'Stimulated emission occurs randomly in all directions',
              'Stimulated emission produces photons with the same phase and direction as the incident photon',
              'Spontaneous emission only occurs in gas lasers'
            ],
            correctAnswer: 2,
            explanation: 'In stimulated emission, the emitted photon has the same phase, direction, and frequency as the incident photon, while spontaneous emission occurs randomly.'
          },
          {
            id: 'q3',
            text: 'Which condition is necessary for laser operation?',
            options: [
              'Population inversion',
              'Equal populations in all energy levels',
              'More atoms in ground state than excited state',
              'Complete depletion of ground state'
            ],
            correctAnswer: 0,
            explanation: 'Population inversion, where more atoms are in an excited state than in a lower energy state, is necessary for laser operation to achieve optical gain.'
          },
          {
            id: 'q4',
            text: 'Which pumping mechanism is used in a ruby laser?',
            options: [
              'Electrical pumping',
              'Chemical pumping',
              'Optical pumping',
              'Thermal pumping'
            ],
            correctAnswer: 2,
            explanation: 'Ruby lasers use optical pumping, typically with a xenon flash lamp, to excite chromium ions in the ruby crystal.'
          },
          {
            id: 'q5',
            text: 'What determines the temporal coherence of a laser?',
            options: [
              'The size of the laser cavity',
              'The monochromaticity of the light',
              'The power of the pump source',
              'The temperature of the gain medium'
            ],
            correctAnswer: 1,
            explanation: 'Temporal coherence is related to how monochromatic (single-wavelength) the light is, which affects the laser\'s ability to produce interference patterns.'
          }
        ]
      }
    }
  },
  {
    id: 'unit-2-threshold-resonators',
    title: 'Unit II: Threshold Condition and Resonators',
    description: 'Explore optical resonators, cavity modes, and the conditions required for laser operation.',
    difficulty: 'intermediate',
    concepts: ['optical resonators', 'cavity modes', 'threshold condition', 'resonator stability'],
    duration: 50,
    points: 150,
    prerequisites: ['unit-1-absorption-emission'],
    content: {
      sections: [
        {
          id: 'optical-resonators',
          title: 'Optical Resonators',
          content: `
            <h2>Fundamentals of Optical Resonators</h2>
            
            <p>An optical resonator, also known as an optical cavity, is a fundamental component of laser systems that provides feedback and mode selection.</p>
            
            <h3>Basic Components</h3>
            <ul>
              <li>Two or more mirrors forming a closed path</li>
              <li>Gain medium within the cavity</li>
              <li>Output coupling mechanism</li>
            </ul>
            
            <h3>Common Resonator Types</h3>
            
            <h4>1. Plane-Parallel (Fabry-Pérot)</h4>
            <ul>
              <li>Simplest configuration</li>
              <li>Two flat mirrors facing each other</li>
              <li>Sensitive to alignment</li>
              <li>g₁ = g₂ = 1</li>
            </ul>
            
            <h4>2. Confocal</h4>
            <ul>
              <li>Spherical mirrors with focal points coinciding</li>
              <li>More stable than plane-parallel</li>
              <li>Easier alignment</li>
              <li>g₁ = g₂ = 0</li>
            </ul>
            
            <h4>3. Concentric</h4>
            <ul>
              <li>Centers of curvature coincide</li>
              <li>Maximum mode volume</li>
              <li>Very sensitive to alignment</li>
              <li>g₁ = g₂ = -1</li>
            </ul>
            
            <h4>4. Hemispherical</h4>
            <ul>
              <li>One flat mirror, one spherical mirror</li>
              <li>Good mode selection</li>
              <li>Moderate stability</li>
              <li>g₁ = 1, g₂ = 0</li>
            </ul>
          `,
          imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          interactive: {
            type: 'simulation',
            data: {
              simulationType: 'resonator',
              parameters: ['mirrorType', 'cavityLength', 'curvature']
            }
          }
        },
        {
          id: 'cavity-modes',
          title: 'Cavity Modes and Mode Selection',
          content: `
            <h2>Laser Cavity Modes</h2>
            
            <p>Cavity modes are the allowed electromagnetic field distributions that can exist within an optical resonator.</p>
            
            <h3>Longitudinal Modes</h3>
            <p>These modes differ in frequency and correspond to different standing wave patterns along the cavity axis:</p>
            
            <ul>
              <li>Frequency spacing: Δν = c/2L</li>
              <li>Wavelength condition: L = qλ/2</li>
              <li>Where:
                <ul>
                  <li>c: Speed of light</li>
                  <li>L: Cavity length</li>
                  <li>q: Mode number (integer)</li>
                  <li>λ: Wavelength</li>
                </ul>
              </li>
            </ul>
            
            <h3>Transverse Modes</h3>
            <p>These modes describe the field distribution perpendicular to the propagation direction:</p>
            
            <ul>
              <li>Described by TEMmn notation</li>
              <li>m, n: Number of nodes in x and y directions</li>
              <li>TEM00: Fundamental Gaussian mode</li>
              <li>Higher-order modes have more complex patterns</li>
            </ul>
            
            <h3>Mode Selection Techniques</h3>
            
            <h4>1. Aperture Selection</h4>
            <ul>
              <li>Physical apertures in cavity</li>
              <li>Preferentially attenuates higher-order modes</li>
              <li>Simple but effective</li>
            </ul>
            
            <h4>2. Resonator Design</h4>
            <ul>
              <li>Unstable resonators for mode control</li>
              <li>Curved mirror configurations</li>
              <li>Optimized mode volume</li>
            </ul>
            
            <h4>3. Frequency Selection</h4>
            <ul>
              <li>Etalons</li>
              <li>Gratings</li>
              <li>Prisms</li>
              <li>Thin-film filters</li>
            </ul>
          `,
          imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        }
      ],
      quiz: {
        id: 'unit-2-quiz',
        lessonId: 'unit-2-threshold-resonators',
        questions: [
          {
            id: 'q1',
            text: 'What is the stability condition for optical resonators?',
            options: [
              '0 ≤ g₁g₂ ≤ 1',
              'g₁ + g₂ = 1',
              'g₁g₂ > 1',
              'g₁ = g₂'
            ],
            correctAnswer: 0,
            explanation: 'The stability condition for optical resonators is 0 ≤ g₁g₂ ≤ 1, where g₁ and g₂ are the g-parameters of the resonator mirrors.'
          },
          {
            id: 'q2',
            text: 'Which resonator type has g₁ = g₂ = 0?',
            options: [
              'Plane-parallel',
              'Confocal',
              'Concentric',
              'Hemispherical'
            ],
            correctAnswer: 1,
            explanation: 'A confocal resonator has g₁ = g₂ = 0, where the focal points of both spherical mirrors coincide.'
          },
          {
            id: 'q3',
            text: 'What determines the frequency spacing between longitudinal modes?',
            options: [
              'Mirror reflectivity',
              'Gain medium length',
              'Cavity length',
              'Pump power'
            ],
            correctAnswer: 2,
            explanation: 'The frequency spacing between longitudinal modes is determined by the cavity length L, given by Δν = c/2L, where c is the speed of light.'
          },
          {
            id: 'q4',
            text: 'Which transverse mode has a Gaussian intensity profile?',
            options: [
              'TEM01',
              'TEM10',
              'TEM11',
              'TEM00'
            ],
            correctAnswer: 3,
            explanation: 'The TEM00 mode is the fundamental transverse mode with a Gaussian intensity profile, which is often the most desirable for applications.'
          },
          {
            id: 'q5',
            text: 'What is the primary purpose of an optical resonator in a laser?',
            options: [
              'To cool the gain medium',
              'To provide feedback and mode selection',
              'To supply pump energy',
              'To focus the output beam'
            ],
            correctAnswer: 1,
            explanation: 'The primary purpose of an optical resonator is to provide feedback of the stimulated emission and select specific modes of oscillation.'
          }
        ]
      }
    }
  },
  {
    id: 'unit-3-types-of-lasers',
    title: 'Unit III: Types of Lasers',
    description: 'Explore different types of lasers including gas, solid-state, semiconductor, and fiber lasers.',
    difficulty: 'intermediate',
    concepts: ['gas lasers', 'solid-state lasers', 'semiconductor lasers', 'fiber lasers'],
    duration: 55,
    points: 150,
    prerequisites: ['unit-1-absorption-emission', 'unit-2-threshold-resonators'],
    content: {
      sections: [
        {
          id: 'gas-lasers',
          title: 'Gas Lasers',
          content: `
            <h2>Gas Laser Systems</h2>
            
            <p>Gas lasers use gaseous media for light amplification. They offer excellent beam quality and stability.</p>
            
            <h3>Helium-Neon (HeNe) Laser</h3>
            <ul>
              <li>Most common gas laser</li>
              <li>632.8 nm wavelength (red)</li>
              <li>Electrical discharge pumping</li>
              <li>Applications: alignment, holography, education</li>
            </ul>
            
            <h3>Carbon Dioxide (CO₂) Laser</h3>
            <ul>
              <li>High power output</li>
              <li>10.6 μm wavelength (infrared)</li>
              <li>Excellent efficiency</li>
              <li>Applications: cutting, welding, surgery</li>
            </ul>
            
            <h3>Excimer Lasers</h3>
            <ul>
              <li>UV wavelengths</li>
              <li>High photon energy</li>
              <li>Pulsed operation</li>
              <li>Applications: semiconductor processing, eye surgery</li>
            </ul>
          `,
          imageUrl: 'https://images.unsplash.com/photo-1620428268482-cf1851a36764?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          interactive: {
            type: 'simulation',
            data: {
              simulationType: 'gas-laser',
              parameters: ['pressure', 'current', 'temperature']
            }
          }
        },
        {
          id: 'solid-state-lasers',
          title: 'Solid-State Lasers',
          content: `
            <h2>Solid-State Laser Systems</h2>
            
            <p>Solid-state lasers use crystalline or glass materials doped with active ions.</p>
            
            <h3>Nd:YAG Laser</h3>
            <ul>
              <li>1064 nm wavelength</li>
              <li>High power capability</li>
              <li>Q-switching possible</li>
              <li>Applications: industrial processing, medical</li>
            </ul>
            
            <h3>Ruby Laser</h3>
            <ul>
              <li>First demonstrated laser</li>
              <li>694.3 nm wavelength</li>
              <li>Pulsed operation</li>
              <li>Historical significance</li>
            </ul>
            
            <h3>Ti:Sapphire Laser</h3>
            <ul>
              <li>Tunable wavelength</li>
              <li>Ultrashort pulses</li>
              <li>High peak power</li>
              <li>Applications: spectroscopy, research</li>
            </ul>
          `,
          imageUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          interactive: {
            type: 'simulation',
            data: {
              simulationType: 'solid-state-laser',
              parameters: ['pumpPower', 'crystalTemp', 'wavelength']
            }
          }
        },
        {
          id: 'semiconductor-lasers',
          title: 'Semiconductor Lasers',
          content: `
            <h2>Semiconductor Laser Diodes</h2>
            
            <p>Semiconductor lasers are compact, efficient devices based on p-n junctions.</p>
            
            <h3>Basic Principles</h3>
            <ul>
              <li>Direct bandgap materials</li>
              <li>Electrical pumping</li>
              <li>High efficiency</li>
              <li>Compact size</li>
            </ul>
            
            <h3>Types of Diode Lasers</h3>
            <ul>
              <li>Edge-emitting lasers</li>
              <li>Vertical-cavity surface-emitting lasers (VCSELs)</li>
              <li>Distributed feedback (DFB) lasers</li>
            </ul>
            
            <h3>Applications</h3>
            <ul>
              <li>Optical communications</li>
              <li>Optical storage (CD, DVD, Blu-ray)</li>
              <li>Barcode scanners</li>
              <li>Laser pointers</li>
            </ul>
          `,
          imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          interactive: {
            type: 'simulation',
            data: {
              simulationType: 'diode-laser',
              parameters: ['current', 'temperature', 'wavelength']
            }
          }
        }
      ],
      quiz: {
        id: 'unit-3-quiz',
        lessonId: 'unit-3-types-of-lasers',
        questions: [
          {
            id: 'q1',
            text: 'Which gas laser is commonly used for industrial cutting and welding?',
            options: [
              'HeNe laser',
              'CO₂ laser',
              'Argon laser',
              'Excimer laser'
            ],
            correctAnswer: 1,
            explanation: 'CO₂ lasers are widely used for industrial cutting and welding due to their high power output and efficiency.'
          },
          {
            id: 'q2',
            text: 'What is the typical wavelength of a HeNe laser?',
            options: [
              '532 nm',
              '632.8 nm',
              '1064 nm',
              '10.6 μm'
            ],
            correctAnswer: 1,
            explanation: 'The most common HeNe laser operates at 632.8 nm, producing red visible light.'
          },
          {
            id: 'q3',
            text: 'Which type of laser was the first to be demonstrated?',
            options: [
              'Semiconductor laser',
              'CO₂ laser',
              'Ruby laser',
              'Nd:YAG laser'
            ],
            correctAnswer: 2,
            explanation: 'The ruby laser, developed by Theodore Maiman in 1960, was the first laser to be successfully demonstrated.'
          },
          {
            id: 'q4',
            text: 'What is a key advantage of semiconductor lasers?',
            options: [
              'Highest power output',
              'Best beam quality',
              'Longest lifetime',
              'High efficiency and compact size'
            ],
            correctAnswer: 3,
            explanation: 'Semiconductor lasers are known for their high efficiency, compact size, and direct electrical pumping capability.'
          },
          {
            id: 'q5',
            text: 'Which laser type is commonly used in fiber optic communications?',
            options: [
              'Ruby laser',
              'CO₂ laser',
              'Semiconductor laser',
              'Excimer laser'
            ],
            correctAnswer: 2,
            explanation: 'Semiconductor lasers are the primary choice for fiber optic communications due to their compact size, efficiency, and suitable wavelengths.'
          }
        ]
      }
    }
  },
  {
    id: 'unit-4-ultrafast-photonics',
    title: 'Unit IV: Ultrafast Photonics and Laser Q Switching',
    description: 'Study advanced laser techniques including Q-switching, mode locking, and ultrafast pulse generation.',
    difficulty: 'advanced',
    concepts: ['Q-switching', 'mode locking', 'ultrafast pulses', 'nonlinear optics'],
    duration: 60,
    points: 200,
    prerequisites: ['unit-1-absorption-emission', 'unit-2-threshold-resonators', 'unit-3-types-of-lasers'],
    content: {
      sections: [
        {
          id: 'q-switching',
          title: 'Q-Switching Techniques',
          content: `
            <h2>Q-Switching Fundamentals</h2>
            
            <p>Q-switching is a technique for generating short, intense laser pulses by modulating the Q factor of the laser cavity.</p>
            
            <h3>Basic Principles</h3>
            <ul>
              <li>Quality factor (Q) modulation</li>
              <li>Energy storage and release</li>
              <li>High peak power output</li>
              <li>Nanosecond pulse durations</li>
            </ul>
            
            <h3>Methods of Q-Switching</h3>
            
            <h4>1. Active Q-Switching</h4>
            <ul>
              <li>Electro-optic modulators</li>
              <li>Acousto-optic modulators</li>
              <li>Rotating mirrors</li>
              <li>Controlled timing</li>
            </ul>
            
            <h4>2. Passive Q-Switching</h4>
            <ul>
              <li>Saturable absorbers</li>
              <li>Self-modulation</li>
              <li>Simpler design</li>
              <li>Random timing</li>
            </ul>
          `,
          imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          interactive: {
            type: 'simulation',
            data: {
              simulationType: 'q-switch',
              parameters: ['switchingRate', 'cavityLoss', 'pumpPower']
            }
          }
        },
        {
          id: 'mode-locking',
          title: 'Mode Locking and Ultrafast Pulses',
          content: `
            <h2>Mode Locking Techniques</h2>
            
            <p>Mode locking is used to generate ultrashort laser pulses by establishing a fixed phase relationship between longitudinal modes.</p>
            
            <h3>Principles of Mode Locking</h3>
            <ul>
              <li>Phase synchronization</li>
              <li>Constructive interference</li>
              <li>Pulse formation</li>
              <li>Femtosecond durations</li>
            </ul>
            
            <h3>Types of Mode Locking</h3>
            
            <h4>1. Active Mode Locking</h4>
            <ul>
              <li>External modulation</li>
              <li>Precise timing control</li>
              <li>Longer pulse durations</li>
            </ul>
            
            <h4>2. Passive Mode Locking</h4>
            <ul>
              <li>Saturable absorption</li>
              <li>Kerr lens effect</li>
              <li>Shorter pulses possible</li>
            </ul>
            
            <h3>Applications</h3>
            <ul>
              <li>Ultrafast spectroscopy</li>
              <li>Micromachining</li>
              <li>Medical procedures</li>
              <li>Scientific research</li>
            </ul>
          `,
          imageUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          interactive: {
            type: 'simulation',
            data: {
              simulationType: 'mode-lock',
              parameters: ['modulation', 'bandwidth', 'dispersion']
            }
          }
        }
      ],
      quiz: {
        id: 'unit-4-quiz',
        lessonId: 'unit-4-ultrafast-photonics',
        questions: [
          {
            id: 'q1',
            text: 'What is the primary purpose of Q-switching?',
            options: [
              'To generate continuous wave output',
              'To generate high-peak-power pulses',
              'To improve beam quality',
              'To reduce power consumption'
            ],
            correctAnswer: 1,
            explanation: 'Q-switching is used to generate short, intense laser pulses by modulating the cavity Q factor and rapidly releasing stored energy.'
          },
          {
            id: 'q2',
            text: 'Which method is NOT used for active Q-switching?',
            options: [
              'Electro-optic modulators',
              'Acousto-optic modulators',
              'Saturable absorbers',
              'Rotating mirrors'
            ],
            correctAnswer: 2,
            explanation: 'Saturable absorbers are used for passive Q-switching, not active Q-switching which requires external control.'
          },
          {
            id: 'q3',
            text: 'What is mode locking used for?',
            options: [
              'Generating continuous wave output',
              'Improving beam quality',
              'Generating ultrashort pulses',
              'Reducing laser linewidth'
            ],
            correctAnswer: 2,
            explanation: 'Mode locking establishes a fixed phase relationship between longitudinal modes to generate ultrashort pulses.'
          },
          {
            id: 'q4',
            text: 'Which type of mode locking can achieve shorter pulse durations?',
            options: [
              'Active mode locking',
              'Passive mode locking',
              'Both achieve the same duration',
              'Neither can achieve short pulses'
            ],
            correctAnswer: 1,
            explanation: 'Passive mode locking typically achieves shorter pulse durations than active mode locking due to faster response times of passive elements.'
          },
          {
            id: 'q5',
            text: 'What is the typical pulse duration range for Q-switched lasers?',
            options: [
              'Femtoseconds',
              'Picoseconds',
              'Nanoseconds',
              'Microseconds'
            ],
            correctAnswer: 2,
            explanation: 'Q-switched lasers typically produce pulses in the nanosecond range, while mode-locked lasers can achieve femtosecond durations.'
          }
        ]
      }
    }
  },
  {
    id: 'unit-5-applications',
    title: 'Unit V: Applications',
    description: 'Discover the wide range of laser applications in industry, medicine, communications, and research.',
    difficulty: 'advanced',
    concepts: ['industrial processing', 'medical applications', 'optical communications', 'scientific research'],
    duration: 45,
    points: 150,
    prerequisites: ['unit-1-absorption-emission', 'unit-2-threshold-resonators', 'unit-3-types-of-lasers', 'unit-4-ultrafast-photonics'],
    content: {
      sections: [
        {
          id: 'industrial-applications',
          title: 'Industrial Applications',
          content: `
            <h2>Industrial Laser Processing</h2>
            
            <p>Lasers have revolutionized manufacturing and industrial processing.</p>
            
            <h3>Material Processing</h3>
            <ul>
              <li>Cutting and drilling</li>
              <li>Welding and joining</li>
              <li>Surface treatment</li>
              <li>Heat treatment</li>
            </ul>
            
            <h3>Measurement and Control</h3>
            <ul>
              <li>Alignment and surveying</li>
              <li>Quality control</li>
              <li>3D scanning</li>
              <li>Process monitoring</li>
            </ul>
            
            <h3>Marking and Engraving</h3>
            <ul>
              <li>Product identification</li>
              <li>Decorative engraving</li>
              <li>Security marking</li>
              <li>Barcode generation</li>
            </ul>
          `,
          imageUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          interactive: {
            type: 'simulation',
            data: {
              simulationType: 'laser-cutting',
              parameters: ['power', 'speed', 'material']
            }
          }
        },
        {
          id: 'medical-applications',
          title: 'Medical Applications',
          content: `
            <h2>Laser Medicine</h2>
            
            <p>Lasers enable precise, minimally invasive medical procedures.</p>
            
            <h3>Surgical Applications</h3>
            <ul>
              <li>Eye surgery (LASIK)</li>
              <li>Cancer treatment</li>
              <li>Dental procedures</li>
              <li>Cosmetic surgery</li>
            </ul>
            
            <h3>Diagnostic Tools</h3>
            <ul>
              <li>Optical coherence tomography</li>
              <li>Fluorescence imaging</li>
              <li>Blood flow measurement</li>
              <li>Tissue analysis</li>
            </ul>
            
            <h3>Therapeutic Uses</h3>
            <ul>
              <li>Photodynamic therapy</li>
              <li>Pain management</li>
              <li>Wound healing</li>
              <li>Skin treatments</li>
            </ul>
          `,
          imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          interactive: {
            type: 'simulation',
            data: {
              simulationType: 'medical-laser',
              parameters: ['wavelength', 'pulseEnergy', 'exposure']
            }
          }
        },
        {
          id: 'communications',
          title: 'Optical Communications',
          content: `
            <h2>Laser Communications</h2>
            
            <p>Lasers form the backbone of modern optical communication systems.</p>
            
            <h3>Fiber Optic Systems</h3>
            <ul>
              <li>High bandwidth transmission</li>
              <li>Long-distance communication</li>
              <li>Wavelength division multiplexing</li>
              <li>Network architecture</li>
            </ul>
            
            <h3>Free-Space Optical Links</h3>
            <ul>
              <li>Satellite communications</li>
              <li>Point-to-point links</li>
              <li>Last-mile solutions</li>
              <li>Secure communications</li>
            </ul>
            
            <h3>Components and Technology</h3>
            <ul>
              <li>Optical modulators</li>
              <li>Photodetectors</li>
              <li>Amplifiers</li>
              <li>Switches and routers</li>
            </ul>
          `,
          imageUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          interactive: {
            type: 'simulation',
            data: {
              simulationType: 'optical-comm',
              parameters: ['dataRate', 'distance', 'wavelength']
            }
          }
        }
      ],
      quiz: {
        id: 'unit-5-quiz',
        lessonId: 'unit-5-applications',
        questions: [
          {
            id: 'q1',
            text: 'Which laser is commonly used for metal cutting in industry?',
            options: [
              'HeNe laser',
              'CO₂ laser',
              'Diode laser',
              'Ruby laser'
            ],
            correctAnswer: 1,
            explanation: 'CO₂ lasers are widely used for metal cutting due to their high power output and efficiency.'
          },
          {
            id: 'q2',
            text: 'What type of laser is used in LASIK eye surgery?',
            options: [
              'CO₂ laser',
              'Ruby laser',
              'Excimer laser',
              'Nd:YAG laser'
            ],
            correctAnswer: 2,
            explanation: 'Excimer lasers are used in LASIK surgery due to their precise UV wavelength and minimal thermal effects.'
          },
          {
            id: 'q3',
            text: 'Which property makes lasers ideal for fiber optic communications?',
            options: [
              'High power output',
              'Coherence and directionality',
              'Multiple wavelengths',
              'Pulse operation'
            ],
            correctAnswer: 1,
            explanation: 'The coherence and directionality of laser light make it ideal for transmission through optical fibers.'
          },
          {
            id: 'q4',
            text: 'What is wavelength division multiplexing used for?',
            options: [
              'Laser cutting',
              'Medical diagnosis',
              'Increasing communication capacity',
              'Surface treatment'
            ],
            correctAnswer: 2,
            explanation: 'Wavelength division multiplexing increases communication capacity by transmitting multiple signals at different wavelengths.'
          },
          {
            id: 'q5',
            text: 'Which laser application requires the highest precision?',
            options: [
              'Barcode scanning',
              'Metal welding',
              'Microsurgery',
              'Communications'
            ],
            correctAnswer: 2,
            explanation: 'Microsurgery requires extremely high precision to avoid damage to surrounding tissues.'
          }
        ]
      }
    }
  }
];
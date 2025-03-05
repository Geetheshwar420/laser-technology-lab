import { Lesson } from '../types';

export const mockLessons: Lesson[] = [
  {
    id: 'laser-fundamentals',
    title: 'Laser Fundamentals',
    description: 'Learn the basic principles of laser operation and the physics behind stimulated emission.',
    difficulty: 'beginner',
    concepts: ['stimulated emission', 'population inversion', 'optical resonators'],
    duration: 30,
    points: 100,
    prerequisites: [],
    content: {
      sections: [
        {
          id: 'intro',
          title: 'Introduction to Lasers',
          content: `
            <p>The word "LASER" is an acronym for <strong>L</strong>ight <strong>A</strong>mplification by <strong>S</strong>timulated <strong>E</strong>mission of <strong>R</strong>adiation. Lasers are devices that produce intense beams of light which are monochromatic, coherent, and highly collimated.</p>
            
            <p>The wavelength (color) of laser light is extremely pure (monochromatic) compared to other sources of light, and all of the photons that make up the laser beam have a fixed phase relationship (coherence) with respect to one another. Most other sources of light emit photons in random directions, but a laser emits photons in a narrow beam in a specific direction.</p>
            
            <p>These unique properties of laser light are what make lasers useful in a wide range of applications from precision cutting and welding to surgery, communications, and scientific research.</p>
          `,
          imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 'stimulated-emission',
          title: 'Stimulated Emission',
          content: `
            <p>The fundamental process that makes a laser work is called <strong>stimulated emission</strong>, which was first proposed by Albert Einstein in 1917.</p>
            
            <p>When an atom or molecule absorbs energy, electrons can be excited from a lower energy level to a higher one. These excited electrons will naturally decay back to their ground state, releasing the excess energy as photons (spontaneous emission).</p>
            
            <p>However, if an excited electron encounters a photon with energy equal to the energy difference between its current excited state and a lower state, the electron can be stimulated to drop to the lower energy state, emitting a second photon identical to the one that stimulated it. This is stimulated emission, and it produces coherent light.</p>
            
            <p>The key characteristics of stimulated emission are:</p>
            <ul>
              <li>The emitted photon has the same wavelength as the stimulating photon</li>
              <li>The emitted photon travels in the same direction as the stimulating photon</li>
              <li>The emitted photon is in phase with the stimulating photon</li>
            </ul>
            
            <p>These properties are what give laser light its coherence and directionality.</p>
          `,
          imageUrl: 'https://images.unsplash.com/photo-1607988795691-3d0147b43231?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 'population-inversion',
          title: 'Population Inversion',
          content: `
            <p><strong>Population inversion</strong> is a state where there are more atoms or molecules in an excited state than in a lower energy state. This is a necessary condition for laser operation.</p>
            
            <p>In normal conditions, according to the Boltzmann distribution, more atoms are in lower energy states than in higher ones. For stimulated emission to dominate over absorption (which would prevent amplification), we need to create a population inversion.</p>
            
            <p>Population inversion is achieved through a process called <strong>pumping</strong>, which can be done in several ways:</p>
            <ul>
              <li><strong>Optical pumping</strong>: Using light from another source to excite the atoms</li>
              <li><strong>Electrical pumping</strong>: Using electrical discharge to excite the atoms</li>
              <li><strong>Chemical pumping</strong>: Using energy from chemical reactions</li>
            </ul>
            
            <p>Once population inversion is achieved, stimulated emission can occur more frequently than absorption, leading to light amplification - the core principle of laser operation.</p>
          `,
          imageUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 'laser-components',
          title: 'Basic Components of a Laser',
          content: `
            <p>All lasers contain three essential components:</p>
            
            <p><strong>1. Gain Medium</strong></p>
            <p>The gain medium is the material that amplifies light through stimulated emission. It can be:</p>
            <ul>
              <li>Gas (e.g., helium-neon, carbon dioxide)</li>
              <li>Liquid (e.g., dye lasers)</li>
              <li>Solid (e.g., ruby, neodymium-doped yttrium aluminum garnet or Nd:YAG)</li>
              <li>Semiconductor (e.g., gallium arsenide)</li>
            </ul>
            
            <p><strong>2. Pumping Mechanism</strong></p>
            <p>The pumping mechanism supplies energy to the gain medium to create population inversion. As mentioned earlier, this can be optical, electrical, or chemical.</p>
            
            <p><strong>3. Optical Resonator</strong></p>
            <p>The optical resonator typically consists of two mirrors that reflect light back and forth through the gain medium, allowing it to be amplified multiple times. One mirror is usually fully reflective, while the other is partially transmissive to allow some light to exit as the laser beam.</p>
            
            <p>The combination of these three components creates a feedback system that allows light to be amplified through multiple passes through the gain medium, resulting in a coherent, monochromatic, and directional beam of light.</p>
          `,
          imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        }
      ],
      quiz: {
        id: 'laser-fundamentals-quiz',
        lessonId: 'laser-fundamentals',
        questions: [
          {
            id: 'q1',
            text: 'What does the acronym LASER stand for?',
            options: [
              'Light Amplification by Stimulated Emission of Radiation',
              'Light Amplification by Spontaneous Emission of Radiation',
              'Light Absorption and Stimulated Emission of Radiation',
              'Light Amplification and Synchronized Emission of Radiation'
            ],
            correctAnswer: 0,
            explanation: 'LASER stands for Light Amplification by Stimulated Emission of Radiation, which describes the physical process that makes laser light possible.'
          },
          {
            id: 'q2',
            text: 'Which of the following is NOT a characteristic of laser light?',
            options: [
              'Monochromatic',
              'Coherent',
              'Diffuse',
              'Directional'
            ],
            correctAnswer: 2,
            explanation: 'Laser light is highly directional (collimated), not diffuse. Diffuse light spreads out in many directions, while laser light travels in a narrow, focused beam.'
          },
          {
            id: 'q3',
            text: 'What is stimulated emission?',
            options: [
              'The spontaneous release of a photon when an electron drops to a lower energy level',
              'The process where an incoming photon causes an excited electron to emit an identical photon',
              'The absorption of a photon by an atom, raising an electron to a higher energy level',
              'The process of creating population inversion in a gain medium'
            ],
            correctAnswer: 1,
            explanation: 'Stimulated emission occurs when an incoming photon interacts with an excited electron, causing it to drop to a lower energy level and emit an identical photon with the same wavelength, direction, and phase.'
          },
          {
            id: 'q4',
            text: 'What is population inversion?',
            options: [
              'When more atoms are in a lower energy state than in a higher energy state',
              'When equal numbers of atoms are in higher and lower energy states',
              'When more atoms are in a higher energy state than in a lower energy state',
              'When all atoms are in their ground state'
            ],
            correctAnswer: 2,
            explanation: 'Population inversion is a state where more atoms or molecules are in an excited state than in a lower energy state. This condition is necessary for laser operation as it allows stimulated emission to dominate over absorption.'
          },
          {
            id: 'q5',
            text: 'Which of the following is NOT an essential component of a laser?',
            options: [
              'Gain medium',
              'Pumping mechanism',
              'Optical resonator',
              'Cooling system'
            ],
            correctAnswer: 3,
            explanation: 'While many lasers do have cooling systems, the three essential components of all lasers are the gain medium, pumping mechanism, and optical resonator. Cooling systems are important for many high-power lasers but are not universally required for all laser types.'
          }
        ]
      }
    }
  },
  {
    id: 'optical-resonators',
    title: 'Optical Resonators',
    description: 'Explore how optical resonators work and their role in laser systems.',
    difficulty: 'intermediate',
    concepts: ['cavity modes', 'resonator stability', 'q-switching'],
    duration: 45,
    points: 150,
    prerequisites: ['laser-fundamentals'],
    content: {
      sections: [
        {
          id: 'intro-resonators',
          title: 'Introduction to Optical Resonators',
          content: `
            <p>An optical resonator, also known as an optical cavity, is a crucial component of a laser system. It consists of two or more mirrors arranged to form a closed path for light to circulate. The primary function of an optical resonator is to provide feedback of the stimulated emission, allowing the light to pass through the gain medium multiple times and be amplified.</p>
            
            <p>The simplest form of an optical resonator is the Fabry-Pérot cavity, which consists of two parallel mirrors facing each other. One mirror is typically fully reflective (100% reflectivity), while the other is partially transmissive to allow some light to exit as the laser beam.</p>
            
            <p>Optical resonators serve several important functions in a laser:</p>
            <ul>
              <li>They provide feedback for stimulated emission</li>
              <li>They determine the spatial properties of the laser beam</li>
              <li>They select which wavelengths (modes) can oscillate</li>
              <li>They contribute to the overall efficiency and stability of the laser</li>
            </ul>
          `,
          imageUrl: 'https://images.unsplash.com/photo-1607988795691-3d0147b43231?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 'resonator-modes',
          title: 'Resonator Modes',
          content: `
            <p>Optical resonators support specific patterns of electromagnetic fields called <strong>modes</strong>. These modes represent the stable field distributions that can exist within the resonator.</p>
            
            <p>There are two main types of modes in an optical resonator:</p>
            
            <p><strong>1. Longitudinal Modes</strong></p>
            <p>Longitudinal modes are related to the frequencies or wavelengths that can resonate within the cavity. For a simple Fabry-Pérot cavity, the condition for a longitudinal mode is that an integer number of half-wavelengths must fit exactly between the mirrors:</p>
            
            <p>L = q(λ/2)</p>
            
            <p>Where:</p>
            <ul>
              <li>L is the cavity length</li>
              <li>q is an integer (the mode number)</li>
              <li>λ is the wavelength</li>
            </ul>
            
            <p>This means that only certain wavelengths (or frequencies) can resonate within the cavity. The frequency spacing between adjacent longitudinal modes is given by:</p>
            
            <p>Δf = c/(2L)</p>
            
            <p>Where c is the speed of light.</p>
            
            <p><strong>2. Transverse Modes</strong></p>
            <p>Transverse modes describe the field distribution perpendicular to the direction of propagation. These modes are often described using TEM<sub>mn</sub> notation (Transverse Electromagnetic Modes), where m and n are integers that specify the number of nodes in the horizontal and vertical directions.</p>
            
            <p>The fundamental mode, TEM<sub>00</sub>, has a Gaussian intensity profile and is usually the most desirable for applications requiring a high-quality beam.</p>
          `,
          imageUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 'resonator-stability',
          title: 'Resonator Stability',
          content: `
            <p>The stability of an optical resonator refers to its ability to maintain a confined beam over many round trips. In an unstable resonator, the beam would eventually walk off the mirrors and be lost.</p>
            
            <p>For a resonator with two spherical mirrors, the stability condition is often expressed using the g-parameters:</p>
            
            <p>0 ≤ g<sub>1</sub>g<sub>2</sub> ≤ 1</p>
            
            <p>Where:</p>
            <ul>
              <li>g<sub>1</sub> = 1 - (L/R<sub>1</sub>)</li>
              <li>g<sub>2</sub> = 1 - (L/R<sub>2</sub>)</li>
              <li>L is the cavity length</li>
              <li>R<sub>1</sub> and R<sub>2</sub> are the radii of curvature of the two mirrors</li>
            </ul>
            
            <p>Different combinations of g<sub>1</sub> and g<sub>2</sub> within the stability region result in different resonator configurations, each with its own characteristics:</p>
            <ul>
              <li><strong>Plane-parallel resonator</strong>: g<sub>1</sub> = g<sub>2</sub> = 1</li>
              <li><strong>Confocal resonator</strong>: g<sub>1</sub> = g<sub>2</sub> = 0</li>
              <li><strong>Concentric resonator</strong>: g<sub>1</sub> = g<sub>2</sub> = -1</li>
              <li><strong>Hemispherical resonator</strong>: g<sub>1</sub> = 1, g<sub>2</sub> = 0</li>
            </ul>
          `,
          imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 'advanced-techniques',
          title: 'Advanced Resonator Techniques',
          content: `
            <p>Several advanced techniques can be applied to optical resonators to achieve specific laser characteristics:</p>
            
            <p><strong>1. Q-Switching</strong></p>
            <p>Q-switching is a technique used to produce short, high-power pulses of laser light. It involves rapidly changing the Q factor (quality factor) of the resonator from a low value (high loss) to a high value (low loss). This allows energy to build up in the gain medium before being released in a short, intense pulse.</p>
            
            <p><strong>2. Mode-Locking</strong></p>
            <p>Mode-locking is a technique used to produce ultrashort pulses, typically in the picosecond or femtosecond range. It works by establishing a fixed phase relationship between the longitudinal modes of the resonator, causing them to interfere constructively at certain points in time, resulting in a train of ultrashort pulses.</p>
            
            <p><strong>3. Frequency Selection</strong></p>
            <p>Various optical elements can be added to the resonator to select specific frequencies or wavelengths:</p>
            <ul>
              <li><strong>Diffraction gratings</strong>: Provide wavelength-dependent feedback</li>
              <li><strong>Prisms</strong>: Separate different wavelengths spatially</li>
              <li><strong>Etalons</strong>: Act as frequency filters</li>
              <li><strong>Birefringent filters</strong>: Use polarization properties to select wavelengths</li>
            </ul>
            
            <p>These techniques allow for precise control over the spectral properties of the laser output, which is crucial for many applications.</p>
          `,
          imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        }
      ],
      quiz: {
        id: 'optical-resonators-quiz',
        lessonId: 'optical-resonators',
        questions: [
          {
            id: 'q1',
            text: 'What is the primary function of an optical resonator in a laser system?',
            options: [
              'To cool the gain medium',
              'To provide energy for population inversion',
              'To provide feedback for stimulated emission',
              'To focus the output beam'
            ],
            correctAnswer: 2,
            explanation: 'The primary function of an optical resonator is to provide feedback of the stimulated emission, allowing light to pass through the gain medium multiple times and be amplified.'
          },
          {
            id: 'q2',
            text: 'In a Fabry-Pérot cavity, what condition must be met for a longitudinal mode to exist?',
            options: [
              'The cavity length must equal the wavelength',
              'An integer number of half-wavelengths must fit exactly between the mirrors',
              'The mirrors must have equal reflectivity',
              'The gain must exceed the losses'
            ],
            correctAnswer: 1,
            explanation: 'For a longitudinal mode to exist in a Fabry-Pérot cavity, an integer number of half-wavelengths must fit exactly between the mirrors, expressed as L = q(λ/2), where L is the cavity length, q is an integer, and λ is the wavelength.'
          },
          {
            id: 'q3',
            text: 'What does the notation TEM₀₀ represent in the context of optical resonators?',
            options: [
              'The temperature and electromagnetic modulation of the resonator',
              'The fundamental transverse electromagnetic mode with a Gaussian profile',
              'The total energy measurement at zero optical density',
              'The thermal equilibrium mode at zero oscillation'
            ],
            correctAnswer: 1,
            explanation: 'TEM₀₀ represents the fundamental transverse electromagnetic mode, which has a Gaussian intensity profile. The subscripts (0,0) indicate that there are no nodes in either the horizontal or vertical directions.'
          },
          {
            id: 'q4',
            text: 'What is the stability condition for an optical resonator with two spherical mirrors?',
            options: [
              '0 ≤ g₁g₂ ≤ 1',
              'g₁ + g₂ = 1',
              'g₁g₂ > 1',
              'g₁ = g₂'
            ],
            correctAnswer: 0,
            explanation: 'The stability condition for an optical resonator with two spherical mirrors is 0 ≤ g₁g₂ ≤ 1, where g₁ = 1 - (L/R₁) and g₂ = 1 - (L/R₂), with L being the cavity length and R₁, R₂ the radii of curvature of the mirrors.'
          },
          {
            id: 'q5',
            text: 'What is Q-switching used for in laser systems?',
            options: [
              'To produce continuous wave (CW) laser output',
              'To produce short, high-power pulses of laser light',
              'To select specific transverse modes',
              'To stabilize the laser frequency'
            ],
            correctAnswer: 1,
            explanation: 'Q-switching is a technique used to produce short, high-power pulses of laser light by rapidly changing the Q factor (quality factor) of the resonator from a low value (high loss) to a high value (low loss).'
          }
        ]
      }
    }
  },
  {
    id: 'laser-applications',
    title: 'Laser Applications',
    description: 'Discover the wide range of applications for lasers in medicine, industry, and research.',
    difficulty: 'beginner',
    concepts: ['medical lasers', 'industrial lasers', 'laser communications'],
    duration: 35,
    points: 100,
    prerequisites: [],
    content: {
      sections: [
        {
          id: 'intro-applications',
          title: 'Introduction to Laser Applications',
          content: `
            <p>Since their invention in 1960, lasers have found applications in virtually every field of modern technology and science. The unique properties of laser light—monochromaticity, coherence, directionality, and high intensity—make it an incredibly versatile tool.</p>
            
            <p>Today, lasers are used in a wide range of applications, from everyday consumer products to cutting-edge scientific research. In this lesson, we'll explore some of the most important applications of lasers in medicine, industry, communications, and scientific research.</p>
          `,
          imageUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 'medical-applications',
          title: 'Medical Applications',
          content: `
            <p>Lasers have revolutionized medicine, enabling new treatments and improving existing ones. The precision and controllability of laser light make it ideal for many medical procedures.</p>
            
            <p><strong>Surgical Applications</strong></p>
            <ul>
              <li><strong>Laser scalpels</strong>: Used for precise cutting with minimal damage to surrounding tissue</li>
              <li><strong>Laser ablation</strong>: Removal of tissue through vaporization</li>
              <li><strong>Laser cauterization</strong>: Sealing blood vessels to prevent bleeding</li>
            </ul>
            
            <p><strong>Ophthalmology</strong></p>
            <ul>
              <li><strong>LASIK (Laser-Assisted In Situ Keratomileusis)</strong>: Reshaping the cornea to correct vision problems</li>
              <li><strong>Laser photocoagulation</strong>: Treating retinal detachment and diabetic retinopathy</li>
              <li><strong>Laser trabeculoplasty</strong>: Treating glaucoma</li>
            </ul>
            
            <p><strong>Dermatology</strong></p>
            <ul>
              <li><strong>Laser hair removal</strong>: Using selective photothermolysis to target hair follicles</li>
              <li><strong>Laser skin resurfacing</strong>: Removing wrinkles, scars, and blemishes</li>
              <li><strong>Tattoo removal</strong>: Breaking down tattoo pigments for removal by the body</li>
            </ul>
            
            <p><strong>Dentistry</strong></p>
            <ul>
              <li><strong>Cavity detection</strong>: Using fluorescence to detect early tooth decay</li>
              <li><strong>Gum surgery</strong>: Precise removal of infected gum tissue</li>
              <li><strong>Teeth whitening</strong>: Activating whitening agents with laser light</li>
            </ul>
          `,
          imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 'industrial-applications',
          title: 'Industrial Applications',
          content: `
            <p>Lasers have become essential tools in manufacturing and industry, offering precision, speed, and automation capabilities that traditional methods cannot match.</p>
            
            <p><strong>Material Processing</strong></p>
            <ul>
              <li><strong>Laser cutting</strong>: Precise cutting of materials from paper to thick metal</li>
              <li><strong>Laser welding</strong>: Joining materials with minimal heat-affected zone</li>
              <li><strong>Laser drilling</strong>: Creating small, precise holes</li>
              <li><strong>Laser marking and engraving</strong>: Permanent marking of products and parts</li>
            </ul>
            
            <p><strong>Measurement and Quality Control</strong></p>
            <ul>
              <li><strong>Laser scanning</strong>: 3D measurement of objects and environments</li>
              <li><strong>Laser interferometry</strong>: High-precision distance and surface measurements</li>
              <li><strong>Laser alignment</strong>: Ensuring precise positioning in manufacturing</li>
            </ul>
            
            <p><strong>Additive Manufacturing</strong></p>
            <ul>
              <li><strong>Selective Laser Sintering (SLS)</strong>: Fusing powder materials layer by layer</li>
              <li><strong>Selective Laser Melting (SLM)</strong>: Fully melting metal powders for high-density parts</li>
              <li><strong>Stereolithography (SLA)</strong>: Curing photopolymer resins with UV lasers</li>
            </ul>
          `,
          imageUrl: 'https://images.unsplash.com/photo-1607988795691-3d0147b43231?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 'communications-research',
          title: 'Communications and Scientific Research',
          content: `
            <p><strong>Optical Communications</strong></p>
            <p>Lasers are the backbone of modern optical communication systems, enabling high-speed data transmission over long distances.</p>
            <ul>
              <li><strong>Fiber optic communications</strong>: Using laser light to transmit data through optical fibers</li>
              <li><strong>Free-space optical communications</strong>: Transmitting data through the atmosphere</li>
              <li><strong>Optical interconnects</strong>: High-speed connections between electronic components</li>
            </ul>
            
            <p><strong>Scientific Research</strong></p>
            <p>Lasers are indispensable tools in scientific research, enabling new discoveries and measurements.</p>
            <ul>
              <li><strong>Spectroscopy</strong>: Analyzing materials by their interaction with laser light</li>
              <li><strong>Laser cooling and trapping</strong>: Cooling atoms to near absolute zero for quantum physics research</li>
              <li><strong>Laser fusion</strong>: Using high-power lasers to initiate nuclear fusion reactions</li>
              <li><strong>LIGO (Laser Interferometer Gravitational-Wave Observatory)</strong>: Detecting gravitational waves using laser interferometry</li>
            </ul>
            
            <p><strong>Consumer Applications</strong></p>
            <p>Lasers are also found in many everyday consumer products.</p>
            <ul>
              <li><strong>Barcode scanners</strong>: Reading product information in stores</li>
              <li><strong>Laser printers</strong>: High-quality document printing</li>
              <li><strong>CD, DVD, and Blu-ray players</strong>: Reading data from optical discs</li>
              <li><strong>Laser pointers</strong>: Highlighting information in presentations</li>
              <li><strong>LiDAR (Light Detection and Ranging)</strong>: Used in autonomous vehicles and smartphones for 3D sensing</li>
            </ul>
          `,
          imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        }
      ],
      quiz: {
        id: 'laser-applications-quiz',
        lessonId: 'laser-applications',
        questions: [
          {
            id: 'q1',
            text: 'Which laser-based eye surgery procedure involves reshaping the cornea to correct vision problems?',
            options: [
              'Laser photocoagulation',
              'Laser trabeculoplasty',
              'LASIK',
              'Laser iridotomy'
            ],
            correctAnswer: 2,
            explanation: 'LASIK (Laser-Assisted In Situ Keratomileusis) is a refractive surgery procedure that involves reshaping the cornea using an excimer laser to correct vision problems such as myopia, hyperopia, and astigmatism.'
          },
          {
            id: 'q2',
            text: 'Which industrial laser application involves building 3D objects by fusing powder materials layer by layer?',
            options: [
              'Laser cutting',
              'Selective Laser Sintering (SLS)',
              'Laser welding',
              'Laser marking'
            ],
            correctAnswer: 1,
            explanation: 'Selective Laser Sintering (SLS) is an additive manufacturing technique that uses a laser to sinter powdered material (typically nylon, metal, or ceramic), binding the material together to create a solid structure layer by layer.'
          },
          {
            id: 'q3',
            text: 'Which of the following is NOT a common application of lasers in dermatology?',
            options: [
              'Hair removal',
              'Tattoo removal',
              'Skin resurfacing',
              'Bone setting'
            ],
            correctAnswer: 3,
            explanation: 'Bone setting is not a laser-based dermatological procedure. Lasers in dermatology are commonly used for hair removal, tattoo removal, and skin resurfacing, but not for setting or repairing bones, which is typically done through surgical procedures or external fixation.'
          },
          {
            id: 'q4',
            text: 'What is the primary use of lasers in fiber optic communications?',
            options: [
              'To amplify electrical signals',
              'To transmit data through optical fibers',
              'To cool the fiber optic cables',
              'To measure the length of the cables'
            ],
            correctAnswer: 1,
            explanation: 'In fiber optic communications, lasers are used to transmit data through optical fibers. The laser light is modulated to encode information, and this light signal travels through the fiber optic cable, allowing for high-speed, long-distance data transmission with minimal loss.'
          },
          {
            id: 'q5',
            text: 'Which scientific research facility uses laser interferometry to detect gravitational waves?',
            options: [
              'CERN',
              'ITER',
              'LIGO',
              'Hubble Space Telescope'
            ],
            correctAnswer: 2,
            explanation: 'LIGO (Laser Interferometer Gravitational-Wave Observatory) uses laser interferometry to detect gravitational waves. It consists of two identical detectors that use laser beams to measure tiny changes in distance caused by passing gravitational waves, confirming a major prediction of Einstein\'s theory of general relativity.'
          }
        ]
      }
    }
  }
];
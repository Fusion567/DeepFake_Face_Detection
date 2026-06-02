'use client'

import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiAward } from 'react-icons/fi'
import { useState } from 'react'
import Image from 'next/image';

const TeamMember = ({
  name,
  role,
  bio,
  skills,
  avatar,
  socials,
  flipped = false
}: {
  name: string
  role: string
  bio: string
  skills: string[]
  avatar: string
  socials: { github?: string; linkedin?: string; email?: string }
  flipped?: boolean
}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: flipped ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`flex flex-col ${flipped ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center mb-20`}
    >
      {/* Avatar with interactive hover */}
      <motion.div
        whileHover={{ y: -10 }}
        className="relative group w-64 h-64 flex-shrink-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-all" />
        <Image
          src={avatar}
          alt={name}
          className="relative w-full h-full rounded-full object-cover border-4 border-dark-300"
        />
      </motion.div>

      {/* Content */}
      <div className="flex-1">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-dark-200 rounded-xl p-6 shadow-lg cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                {name}
              </h3>
              <p className="text-gray-400">{role}</p>
            </div>
            <FiAward className="text-yellow-400 text-xl" />
          </div>

          <motion.p
            className="mt-4 text-gray-300"
            initial={{ height: '3.6rem' }}
            animate={{ height: expanded ? 'auto' : '3.6rem' }}
            transition={{ duration: 0.3 }}
          >
            {bio}
          </motion.p>

          <div className="mt-4 flex gap-3">
            {socials.github && (
              <motion.a
                href={`https://github.com/${socials.github}`}
                target="_blank"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiGithub className="text-xl text-gray-400 hover:text-white" />
              </motion.a>
            )}
            {socials.linkedin && (
              <motion.a
                href={`https://linkedin.com/in/${socials.linkedin}`}
                target="_blank"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiLinkedin className="text-xl text-gray-400 hover:text-blue-400" />
              </motion.a>
            )}
            {socials.email && (
              <motion.a
                href={`mailto:${socials.email}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiMail className="text-xl text-gray-400 hover:text-red-400" />
              </motion.a>
            )}
          </div>
        </motion.div>

        {/* Skills chips */}
        <motion.div 
          className="flex flex-wrap gap-2 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: expanded ? 1 : 0.7 }}
        >
          {skills.map((skill) => (
            <motion.span
              key={skill}
              className="px-3 py-1 bg-dark-300 rounded-full text-sm"
              whileHover={{ scale: 1.05 }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Yashrajsinh Parmar",
      role: "Frontend Developer",
      bio: "Full-stack developer specializing in interactive web applications. Built our detection interface with a focus on accessibility and user experience. Believes technology should be both powerful and intuitive for everyone.",
      skills: ["React", "TypeScript", "Next.js", "UI/UX", "Accessibility"],
      avatar: "yashrajsinh.jpg",
      socials: {
        github: "Fusion567",
        linkedin: "yashraj-parmar-3074b5252/",
        email: "yashraj76801@gmail.com"
      },
      flipped: true
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Meet Our Team
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          The passionate minds behind our deepfake detection technology
        </p>
      </motion.section>

      {teamMembers.map((member, index) => (
        <TeamMember key={index} {...member} flipped={index % 2 !== 0} />
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
        className="bg-dark-200 rounded-xl p-8 mt-12 text-center"
      >
        <h3 className="text-2xl font-bold mb-4">Join Our Mission</h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          We&apos;re always looking for talented individuals passionate about AI ethics and digital security.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg font-medium"
        >
          Contact Us
        </motion.button>
      </motion.div>
    </div>
  )
}

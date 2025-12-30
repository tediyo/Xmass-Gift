'use client'

import { useState, useEffect } from 'react'
import AccentIcons from './AccentIcons'

interface Resolution {
  id: string
  text: string
  completed: boolean
  category: 'personal' | 'career'
  createdAt: number
}

const categories = {
  personal: { label: 'Personal', color: 'bg-primary-red' },
  career: { label: 'Career', color: 'bg-secondary-green' },
}

export default function ResolutionTracker() {
  const [resolutions, setResolutions] = useState<Resolution[]>([])
  const [newResolution, setNewResolution] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'personal' | 'career'>('personal')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('newYearResolutions2026')
    if (saved) {
      try {
        setResolutions(JSON.parse(saved))
      } catch (error) {
        console.error('Error loading resolutions:', error)
      }
    }
  }, [])

  // Save to localStorage whenever resolutions change
  useEffect(() => {
    localStorage.setItem('newYearResolutions2026', JSON.stringify(resolutions))
  }, [resolutions])

  const addResolution = () => {
    if (newResolution.trim()) {
      const resolution: Resolution = {
        id: Date.now().toString(),
        text: newResolution.trim(),
        completed: false,
        category: selectedCategory,
        createdAt: Date.now(),
      }
      setResolutions([...resolutions, resolution])
      setNewResolution('')
    }
  }

  const toggleComplete = (id: string) => {
    setResolutions(
      resolutions.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
    )
  }

  const deleteResolution = (id: string) => {
    setResolutions(resolutions.filter((r) => r.id !== id))
    if (editingId === id) {
      setEditingId(null)
      setEditText('')
    }
  }

  const startEdit = (resolution: Resolution) => {
    setEditingId(resolution.id)
    setEditText(resolution.text)
  }

  const saveEdit = () => {
    if (editText.trim() && editingId) {
      setResolutions(
        resolutions.map((r) =>
          r.id === editingId ? { ...r, text: editText.trim() } : r
        )
      )
      setEditingId(null)
      setEditText('')
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  const completedCount = resolutions.filter((r) => r.completed).length
  const totalCount = resolutions.length
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <div className="w-full fade-in">
      <div className="text-center mb-6 sm:mb-8">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
          <AccentIcons type="star" size="md" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-playfair font-bold text-secondary-green px-2">
            New Year Resolutions 2026
          </h2>
          <AccentIcons type="star" size="md" />
        </div>
        <p className="text-base sm:text-lg md:text-xl text-secondary-green/70 font-inter px-4">
          Track your goals and achievements for the new year
        </p>
      </div>

      {/* Progress Bar */}
      {totalCount > 0 && (
        <div className="bg-white rounded-xl shadow-soft p-4 sm:p-6 mb-6 sm:mb-8 border-2 border-l-primary-red border-r-primary-red">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-3">
            <span className="text-base sm:text-lg font-inter font-semibold text-secondary-green">
              Progress
            </span>
            <span className="text-base sm:text-lg font-inter font-semibold text-primary-red">
              {completedCount} / {totalCount} completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-red to-secondary-green transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs sm:text-sm text-secondary-green/70 font-inter mt-2 text-center">
            {progressPercentage.toFixed(0)}% Complete
          </p>
        </div>
      )}

      {/* Add New Resolution Form */}
      <div className="bg-white rounded-xl shadow-soft p-4 sm:p-6 mb-6 sm:mb-8 border-2 border-l-primary-red border-r-primary-red">
        <h3 className="text-xl sm:text-2xl font-playfair font-bold text-secondary-green mb-3 sm:mb-4">
          Add New Resolution
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-inter font-semibold text-secondary-green mb-2">
              Category
            </label>
            <div className="flex gap-2 sm:gap-3">
              {Object.entries(categories).map(([key, { label, color }]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key as 'personal' | 'career')}
                  className={`min-h-[44px] flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-2 rounded-full font-inter text-sm sm:text-base transition-all duration-300 touch-manipulation ${
                    selectedCategory === key
                      ? `${color} text-white shadow-soft-lg`
                      : 'bg-gray-100 text-secondary-green active:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-inter font-semibold text-secondary-green mb-2">
              Resolution
            </label>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input
                type="text"
                value={newResolution}
                onChange={(e) => setNewResolution(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addResolution()}
                placeholder="e.g., Learn a new programming language"
                className="flex-1 min-h-[44px] px-4 py-3 rounded-lg border-2 border-primary-red/20 focus:border-primary-red focus:outline-none font-inter text-base text-secondary-green"
              />
              <button
                onClick={addResolution}
                className="min-h-[44px] px-6 py-3 bg-primary-red text-white rounded-lg font-inter font-semibold active:bg-primary-red/90 transition-all duration-300 touch-manipulation hover-lift"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resolutions List */}
      <div className="space-y-4">
        {resolutions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-soft p-8 sm:p-12 text-center border-2 border-l-primary-red border-r-primary-red">
            <p className="text-base sm:text-lg md:text-xl text-secondary-green/70 font-inter px-4">
              No resolutions yet. Add your first resolution above! 🎯
            </p>
          </div>
        ) : (
          resolutions.map((resolution) => (
            <div
              key={resolution.id}
              className={`bg-white rounded-xl shadow-soft p-4 sm:p-6 border-2 transition-all duration-300 ${
                resolution.completed
                  ? 'border-l-primary-red border-r-primary-red opacity-75'
                  : 'border-l-primary-red border-r-primary-red hover-lift'
              }`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <input
                  type="checkbox"
                  checked={resolution.completed}
                  onChange={() => toggleComplete(resolution.id)}
                  className="mt-1 w-6 h-6 sm:w-5 sm:h-5 text-primary-red rounded focus:ring-2 focus:ring-primary-red cursor-pointer touch-manipulation flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  {editingId === resolution.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') saveEdit()
                          if (e.key === 'Escape') cancelEdit()
                        }}
                        className="w-full min-h-[44px] px-4 py-2 rounded-lg border-2 border-primary-red focus:border-primary-red focus:outline-none font-inter text-base text-secondary-green"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={saveEdit}
                          className="min-h-[44px] flex-1 px-4 py-2 bg-secondary-green text-white rounded-lg font-inter font-semibold text-sm active:bg-secondary-green/90 transition-all duration-300 touch-manipulation"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="min-h-[44px] flex-1 px-4 py-2 bg-gray-200 text-secondary-green rounded-lg font-inter font-semibold text-sm active:bg-gray-300 transition-all duration-300 touch-manipulation"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <span
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs font-inter font-semibold text-white ${
                            categories[resolution.category].color
                          }`}
                        >
                          {categories[resolution.category].label}
                        </span>
                      </div>
                      <p
                        className={`text-base sm:text-lg font-inter break-words ${
                          resolution.completed
                            ? 'line-through text-secondary-green/50'
                            : 'text-secondary-green'
                        }`}
                      >
                        {resolution.text}
                      </p>
                    </>
                  )}
                </div>
                {editingId !== resolution.id && (
                  <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                    <button
                      onClick={() => startEdit(resolution)}
                      className="min-h-[44px] min-w-[60px] px-3 py-2 bg-secondary-green/10 text-secondary-green rounded-lg font-inter font-semibold text-xs sm:text-sm active:bg-secondary-green/20 transition-all duration-300 touch-manipulation"
                      disabled={resolution.completed}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteResolution(resolution.id)}
                      className="min-h-[44px] min-w-[60px] px-3 py-2 bg-primary-red/10 text-primary-red rounded-lg font-inter font-semibold text-xs sm:text-sm active:bg-primary-red/20 transition-all duration-300 touch-manipulation"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}


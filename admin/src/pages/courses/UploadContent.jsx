import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  UploadCloud,
  ChevronDown,
  Clock,
  PlayCircle,
  Info,
  FileText,
  FileBox,
  StickyNote,
} from 'lucide-react';
import Breadcrumb from '../../components/layout/breadcrumb';
import CourseStepper from '../../components/courses/CourseStepper';
import TipsPanel from '../../components/ui/TipsPanel';
import { FieldLabel } from '../../components/courses/FormFields';
import { useActiveCourse } from '../../context/CourseContext';
import { CONTENT_TYPES } from '../../config/constants';
import axios from 'axios';

const FORMATS = ['MP4', 'WEBM', 'MOV', 'PDF', 'PPT', 'MP3', 'ZIP'];

const CONTENT_ICONS = {
  video: PlayCircle,
  document: FileText,
  presentation: FileBox,
  audio: StickyNote,
  other: Info,
};

export default function UploadContentPage() {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setActiveCourseId } = useActiveCourse();
  const inputRef = useRef(null);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const [sectionId, setSectionId] = useState(searchParams.get('sectionId') || '');
  const [title, setTitle] = useState('');
  const [contentType, setContentType] = useState('video');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState('');

  const loadCourse=async ()=>{
    try{
      setLoading(true);
    const response=await axios.get(`http://localhost:9000/courses/${courseId}`)
    setCourse(response.data.course)
    return response
  }catch(error){
    setError(
      error.response?.data?.message ||
      error.message ||
      'Failed to load course'
    );
  }finally{
    setLoading(false);
  }
  }

  useEffect(()=>{
    loadCourse()
  },[courseId])
  const handleFile = (f) => {
    if (!f) return;
    setFile({
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
    });
  };

  const handleUpload = async () => {
    if (!sectionId) {
      setError('Please select a section');
      return;
    }
    if (!title.trim()) {
      setError('Content title is required');
      return;
    }
    

    setSaving(true);
    setError('');

    try {

      setCourse(updated);
      setTitle('');
      setDescription('');
      setDuration('');
      setFile(null);
      setSuccess('Content saved successfully.');

      const formData=new FormData();
      formData.append('title', form.title)

    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <main className="px-4 sm:px-6 py-6 text-sm text-slate-500">Loading...</main>;
  }

  if (!course) {
    return <main className="px-4 sm:px-6 py-6 text-sm text-rose-500">{error || 'Course not found'}</main>;
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Dashboard', to: '/dashboard' },
          { label: 'Courses', to: '/courses' },
          { label: course.title },
          { label: 'Upload Content' },
        ]}
        backTo={`/courses/${courseId}/sections`}
        backLabel="Back to Sections"
      />
      <CourseStepper currentStep={4} />

      <div className="mx-4 sm:mx-6 mt-5 rounded-2xl bg-gradient-to-r from-indigo-50 via-violet-50 to-indigo-50 border border-indigo-100 px-6 py-5 flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
          <Info size={20} className="text-white" />
        </div>
        <div>
          <p className="font-semibold text-slate-900">Upload your course content</p>
          <p className="text-sm text-slate-500 mt-0.5">
            Add videos, documents, and learning resources. File metadata is saved to the database.
          </p>
        </div>
      </div>

      <main className="px-4 sm:px-6 py-6 grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-6">
        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-5">Content Details</h2>

          {error && <p className="text-sm text-rose-500 mb-4">{error}</p>}
          {success && <p className="text-sm text-emerald-600 mb-4">{success}</p>}

          <div className="space-y-5">
            <div>
              <FieldLabel required>Section</FieldLabel>
              <div className="relative">
                <select
                  value={sectionId}
                  onChange={(e) => setSectionId(e.target.value)}
                  className="w-full appearance-none px-3.5 py-2.5 pr-9 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 text-slate-800"
                >
                  <option value="">Select section</option>
                  {course.sections?.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.order}. {s.title}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>

            <div>
              <FieldLabel required>Content Title</FieldLabel>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 text-slate-800"
              />
            </div>

            <div>
              <FieldLabel required>Content Type</FieldLabel>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                {CONTENT_TYPES.map(({ key, label }) => {
                  const Icon = CONTENT_ICONS[key] || Info;
                  const active = contentType === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setContentType(key)}
                      className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium ${
                        active
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-600 ring-1 ring-indigo-500'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Icon size={16} />
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <FieldLabel>Description</FieldLabel>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 text-slate-800 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <FieldLabel>Duration (HH:MM:SS)</FieldLabel>
                <div className="relative">
                  <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="00:00:00"
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 text-slate-800"
                  />
                </div>
              </div>
              <div>
                <FieldLabel>Is Preview?</FieldLabel>
                <button
                  type="button"
                  onClick={() => setIsPreview((v) => !v)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    isPreview ? 'bg-indigo-600' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                      isPreview ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-7">
            <button
              type="button"
              onClick={handleUpload}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60"
            >
              <UploadCloud size={16} />
              {saving ? 'Saving...' : 'Save Content'}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/courses/${courseId}/sections`)}
              className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </section>

        <aside className="space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-base font-semibold text-slate-900 mb-4">Upload File</h2>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                handleFile(e.dataTransfer.files?.[0]);
              }}
              className={`rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center px-6 py-10 ${
                dragOver ? 'border-indigo-500 bg-indigo-50' : 'border-indigo-200 bg-indigo-50/40'
              }`}
            >
              <UploadCloud size={24} className="text-indigo-600 mb-4" />
              <p className="text-sm font-semibold text-slate-800">Drag & drop your file here</p>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="mt-3 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
              >
                Browse Files
              </button>
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              <div className="flex flex-wrap justify-center gap-1.5 mt-5">
                {FORMATS.map((f) => (
                  <span
                    key={f}
                    className="px-2 py-1 text-[11px] font-medium rounded-md bg-slate-100 text-slate-500"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
            {file && (
              <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <p className="text-sm font-medium text-slate-800 truncate">{file.name}</p>
                <p className="text-xs text-slate-400">{file.size}</p>
              </div>
            )}
          </div>

          <TipsPanel
            title="Tips"
            tips={[
              'Use high-quality videos (1080p recommended)',
              'Add clear titles and descriptions',
              'Organize content in proper sections',
            ]}
          />
        </aside>
      </main>
    </>
  );
}

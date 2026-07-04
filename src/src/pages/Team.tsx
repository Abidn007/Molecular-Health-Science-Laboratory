import { useState } from 'react';
import { User, GraduationCap, Award, Mail, Building, MapPin } from 'lucide-react';
import { TEAM_MEMBERS } from '../data';

// @ts-ignore
import femaleJohraImage from '../assets/images/researcher_female_johra_1783081799765.jpg';
// @ts-ignore
import babyImage from '../assets/images/cur_4_baby_1783082561357.jpg';
// @ts-ignore
import mimImage from '../assets/images/mim_islam_avatar_1783099994959.jpg';

const MEMBER_PHOTOS: Record<string, string> = {
  'pi': 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiwDBbfX6Zx60IcKeFa9VUurC8SeKEpxeG4ZFtz0sBlFJ-zKN-khh7guCGNqWhyP_9QxM9Cftrp_6ET-yVU8bxNLdGTTCYxwUAVmd3eObwC0caaPwtIf39pHRX3pgWpvw1TYwF6QWlAE2NHxMzyNNfNwRnC2D4u857Ez5_0QcGEpqyXrY8sNLY6yxbiGbI/s320/DR.%20KHONDOKAR%20NASIRUJJAMAN.png',
  'cur-1': 'https://i1.rgstatic.net/ii/profile.image/11431281449732688-1747820313513_Q128/Fatematuz-Johra-2.jpg',
  'cur-2': 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjk1vP8IGgPeo2fObJbQw2RBNmxMwqgvp-YqhcehGJCd1gAwH3Bu9lOgkgKQj8yv0U5yR91x58xYUB_bnheVZHuWYak1OAWFpGg3ozwSGXo1DaL0ZYUGDrjOXzWLCr007D4o-9zfWgDCqsl1YxdPYatSKzISTNhzQZC3fk1hNY-P9nERWcO_1_fZm9vR9s/s320/Md.%20Abid%20Hassan.jpeg',
  'cur-3': 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjE7ZU3xqx7zAhiolIo2GNooGUciARpsLnOaRJJl5bD-IKp3jX9wnCBsQRosU39RW3UhwYnMvJYNdSqiXJVIG0GQ6s15NSl583u8_AH9rMduvthh-TnO0heegQKEidP8KC7NhgybOyozPjsgoGgCHniibhtqMCOQX-818Vxt8SnYH2nyQWf0caHLt9a0yE/s320/Muntasir%20Rahman%20Siam.jpg',
  'cur-4': babyImage,
  'alu-1': 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj4qsVZV2eMELnsdZ85YjkrL7xBOiIBTUnKgyFuyePethr0q_0H3zyJ6GoXxQH0FHSjwCQOf9q5MK0nKCwbgqmjJeZHhOerjnppVbCPljBX3hTncvdWPCZbrtcYXH2YC5P73lXfb_MszOr9n0c5DYPj6rg2zCrVwPhhC4PKpO_4DvJpp3aNJLXqZlzKA9M/s1600/Faria%20Tasnim%20Megha.png',
  'alu-2': 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg6hDtFt3uDfwmCWpyR7Cv4NGwtDNsqLuafZR7NLpnLI8f7TlUeb8nyRJNdxWEKCkK3mswMk6r1gJ4gmCd06u5siuaFDSIA5-53R3H84ZYsGb_YI_KQqNz9C7-TBWDnQjtKW9NHv0lYmTv7grNCY0HA0N6wXPtQGRsB1V7tXE8Xli79NgKlIzkOG-YqH2k/s320/Md%20Robiul%20Hasan.jpg',
  'alu-3': mimImage,
  'alu-4': 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhTmWkb2IMQTAuocEx61S_B0KAchqcxlmOJ7URBM031dDeoOWIaupG0hlOkJfx0lLCHP9l7_3KIEW09KefcKFA9We6eS_bICPkS6_J_pzEUzYZmhjsZbpxMc3fwJHPDwP0LqU6FMuqfx_6fwCdouKEBjpt4VlBbSx9Z_YWNGmaLgkOBWayyBfVPykdLz-U/s320/Mrittika%20Rani%20Mondol.jpeg',
  'alu-5': 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiEuMoFt-ocYOJCQpensuJhICqGnvb74zySfzdgy0-SyT08Lyp9o3EpzdFJ-1vTpkyzR6-Kqnk66a8FKwcyHbrmbWpplgKvo2RDv6KCD9_DHQ2NxExjQiuQ4AfDTRlIEsvzNI_2qmpupPfBGp21_wy9AwoFnF0w6aDNDOF6-v6RIeVLAbJGctN-GHLBY8Y/s320/Md.%20Sadaab%20Hassan.jpg',
  'alu-6': 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh_qWacTswt7N5M82a23k2NhksS_lC91uKEEn4ICFhn4-95q6x88umfRufAjvRb_0-wQO8adOYWMvdDEeUqXnhqU_uRIljtYntHovC_slH_709OH_ap2tnb-d_fniCKNtQMvKFWtIZvTdJCCiBfD7BuVXympxZRB8zh1Vo0im8CdnaRs1an95vmS7rduP0/s1600/Nowshin%20Anjum%20Diba.png',
};

export default function Team() {
  const [activeSubTab, setActiveSubTab] = useState<'pi' | 'current' | 'alumni'>('pi');

  const pi = TEAM_MEMBERS.find((m) => m.id === 'pi')!;
  const currentStudents = TEAM_MEMBERS.filter((m) => m.id.startsWith('cur-'));
  const alumni = TEAM_MEMBERS.filter((m) => m.id.startsWith('alu-'));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10" id="team-page">
      {/* Header */}
      <div className="space-y-4">
        <span className="font-mono text-xs uppercase tracking-widest text-teal font-bold">Faculty &amp; Researchers</span>
        <h1 className="text-3xl sm:text-5xl font-bold text-teal-deep font-serif">Laboratory Team</h1>
        <p className="text-sm sm:text-base text-ink-soft max-w-3xl leading-relaxed">
          From hands-on undergraduate project members to PhD candidates studying abroad, MHSL fosters academic excellence, scientific rigor, and collaborative learning at the University of Rajshahi.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-line" role="tablist">
        <button
          role="tab"
          aria-selected={activeSubTab === 'pi'}
          onClick={() => setActiveSubTab('pi')}
          className={`py-3 px-6 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'pi'
              ? 'border-teal text-teal-deep'
              : 'border-transparent text-ink-faint hover:text-ink-soft'
          }`}
        >
          Principal Investigator
        </button>
        <button
          role="tab"
          aria-selected={activeSubTab === 'current'}
          onClick={() => setActiveSubTab('current')}
          className={`py-3 px-6 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'current'
              ? 'border-teal text-teal-deep'
              : 'border-transparent text-ink-faint hover:text-ink-soft'
          }`}
        >
          Current Students
        </button>
        <button
          role="tab"
          aria-selected={activeSubTab === 'alumni'}
          onClick={() => setActiveSubTab('alumni')}
          className={`py-3 px-6 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'alumni'
              ? 'border-teal text-teal-deep'
              : 'border-transparent text-ink-faint hover:text-ink-soft'
          }`}
        >
          Alumni &amp; Placements
        </button>
      </div>

      {/* PI View */}
      {activeSubTab === 'pi' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-teal-deep text-white p-8 sm:p-12 rounded-3xl grid grid-cols-1 md:grid-cols-4 gap-8 items-center border border-teal">
            <div className="flex justify-center md:col-span-1">
              <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-3xl sm:rounded-[32px] overflow-hidden border-4 border-white/20 shadow-lg bg-teal-pale flex items-center justify-center">
                {MEMBER_PHOTOS['pi'] ? (
                  <img
                    src={MEMBER_PHOTOS['pi']}
                    alt={pi.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gold to-teal flex items-center justify-center font-serif text-4xl sm:text-5xl font-bold select-none">
                    {pi.photoInitials}
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-4 md:col-span-3">
              <div className="space-y-1 text-center md:text-left">
                <span className="font-mono text-xs uppercase tracking-widest text-gold-pale font-bold">Principal Investigator</span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  {pi.researchGate ? (
                    <a
                      href={pi.researchGate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gold-pale transition-colors inline-flex items-center gap-2 hover:underline underline-offset-4 animate-fade-in"
                    >
                      {pi.name}
                    </a>
                  ) : (
                    pi.name
                  )}
                </h3>
                <p className="text-xs sm:text-sm text-gold-pale font-medium">Professor, Dept. of Genetic Engineering &amp; Biotechnology</p>
                <p className="text-xs text-white/75">University of Rajshahi, Bangladesh</p>
              </div>

              <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-2xl text-center md:text-left">
                Dr. Nasirujjaman leads the Molecular Health Science Laboratory, establishing experimental standards, planning One Health environmental surveillance runs, and mentoring MS thesis and B.Sc. project researchers. Under his guidance, the lab actively collaborates across human and plant health domains.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono justify-center md:justify-start">
                <div className="flex items-center gap-1.5 text-white/80">
                  <Mail className="w-4 h-4 text-gold" />
                  <span>khondokar@gmail.com</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/80">
                  <Building className="w-4 h-4 text-gold" />
                  <span>Sir J.C. Bose Academic Building</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Current Students View */}
      {activeSubTab === 'current' && (
        <div className="space-y-8 animate-fade-in">
          {/* MS Thesis Students */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-serif text-teal-deep border-b border-line pb-2 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-gold" />
              MS (Thesis) Students · Session 2025-26
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {currentStudents.filter(s => s.role.includes('MS')).map((student) => (
                <div key={student.id} className="bg-paper border border-line rounded-3xl p-8 sm:p-9 flex gap-6 sm:gap-7 items-center hover:border-teal hover:shadow-md transition-all">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl sm:rounded-3xl overflow-hidden bg-teal-pale shrink-0 border border-line flex items-center justify-center shadow-md">
                    {MEMBER_PHOTOS[student.id] ? (
                      <img
                        src={MEMBER_PHOTOS[student.id]}
                        alt={student.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="font-bold font-serif text-3xl text-teal-deep select-none">
                        {student.photoInitials}
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-teal-deep text-xl sm:text-2xl leading-snug">
                      {student.researchGate ? (
                        <a
                          href={student.researchGate}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-teal transition-colors inline-flex items-center gap-1.5 hover:underline underline-offset-4"
                        >
                          {student.name}
                        </a>
                      ) : (
                        student.name
                      )}
                    </h4>
                    <p className="text-sm sm:text-base text-ink-soft font-semibold mt-1">{student.role}</p>
                    <p className="text-xs sm:text-sm text-ink-faint font-mono mt-1.5">Session: {student.session} · GEB, RU</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Undergraduate Students */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-serif text-teal-deep border-b border-line pb-2 flex items-center gap-2">
              <User className="w-5 h-5 text-teal" />
              B.Sc. (Hons) Project Students
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {currentStudents.filter(s => !s.role.includes('MS')).map((student) => (
                <div key={student.id} className="bg-paper border border-line rounded-3xl p-8 sm:p-9 flex gap-6 sm:gap-7 items-center hover:border-teal hover:shadow-md transition-all">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl sm:rounded-3xl overflow-hidden bg-teal-pale shrink-0 border border-line flex items-center justify-center shadow-md">
                    {MEMBER_PHOTOS[student.id] ? (
                      <img
                        src={MEMBER_PHOTOS[student.id]}
                        alt={student.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="font-bold font-serif text-3xl text-teal-deep select-none">
                        {student.photoInitials}
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-teal-deep text-xl sm:text-2xl leading-snug">
                      {student.researchGate ? (
                        <a
                          href={student.researchGate}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-teal transition-colors inline-flex items-center gap-1.5 hover:underline underline-offset-4"
                        >
                          {student.name}
                        </a>
                      ) : (
                        student.name
                      )}
                    </h4>
                    <p className="text-sm sm:text-base text-ink-soft font-semibold mt-1">{student.role}</p>
                    <p className="text-xs sm:text-sm text-ink-faint font-mono mt-1.5">Session: {student.session} · GEB, RU</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Alumni View */}
      {activeSubTab === 'alumni' && (
        <div className="space-y-6 animate-fade-in" id="alumni-tab-panel">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {alumni.map((alum) => (
              <div key={alum.id} className="bg-paper border border-line rounded-3xl p-8 sm:p-9 flex flex-col justify-between space-y-6 hover:border-teal hover:shadow-md transition-all">
                <div className="flex gap-6 sm:gap-7 items-center">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl sm:rounded-3xl overflow-hidden bg-teal-pale shrink-0 border border-line flex items-center justify-center shadow-md">
                    {MEMBER_PHOTOS[alum.id] ? (
                      <img
                        src={MEMBER_PHOTOS[alum.id]}
                        alt={alum.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="font-bold font-serif text-3xl text-teal-deep select-none">
                        {alum.photoInitials}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="font-mono text-xs text-gold font-bold bg-gold-pale/35 px-2.5 py-0.5 rounded">
                        Session {alum.session}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider font-mono text-ink-faint">GEB RU Alum</span>
                    </div>
                    <h4 className="font-serif font-bold text-teal-deep text-xl sm:text-2xl leading-snug">
                      {alum.researchGate ? (
                        <a
                          href={alum.researchGate}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-teal transition-colors inline-flex items-center gap-1.5 hover:underline underline-offset-4"
                        >
                          {alum.name}
                        </a>
                      ) : (
                        alum.name
                      )}
                    </h4>
                    <p className="text-sm sm:text-base text-ink-soft font-semibold">{alum.role}</p>
                  </div>
                </div>

                {alum.nowPosition && (
                  <div className="bg-teal-pale/30 border border-teal/10 p-4 rounded-2xl flex items-start gap-3 text-xs sm:text-sm text-teal-deep leading-relaxed">
                    <Award className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-[10px] uppercase font-mono tracking-wide text-teal-deep">Placement / Destination</span>
                      <p className="mt-1">{alum.nowPosition}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

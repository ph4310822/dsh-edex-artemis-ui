/**
 * Recovery Sequence Widget: a vertical timeline inspired by the Artemis II
 * mission control recovery dashboard. Shows recovery steps with circular
 * status indicators (green for completed, cyan for active), event titles,
 * descriptions, and timestamps.
 */
import css from './RecoveryWidget.module.css'

interface RecoveryStep {
  status: 'completed' | 'active' | 'pending'
  title: string
  description: string
  time: string
}

const RECOVERY_STEPS: RecoveryStep[] = [
  { status: 'completed', title: 'SPLASHDOWN', description: 'Crew Dragon Integrity capsule splashed down in the Pacific Ocean', time: 'T+0:00' },
  { status: 'completed', title: 'CAPSULE SPOTTED', description: 'Recovery vessels confirmed visual contact with the capsule', time: 'T+0:04' },
  { status: 'completed', title: 'DIVER DEPLOYMENT', description: 'Fast rescue boats deployed for capsule approach and retrieval', time: 'T+0:12' },
  { status: 'completed', title: 'FLOTATION COLLAR', description: 'Flotation collar attached to the capsule for post-landing stability', time: 'T+0:28' },
  { status: 'completed', title: 'CREW EGRESS', description: 'Crew members extracted from capsule and transferred to recovery vessel', time: 'T+0:45' },
  { status: 'active', title: 'ON DECK', description: 'Crew capsule secured on deck of recovery vessel for transport', time: 'T+1:12' },
  { status: 'pending', title: 'MEDICAL CHECK', description: 'Post-mission medical evaluation and crew debriefing', time: 'T+2:00' },
  { status: 'pending', title: 'MISSION DEBRIEF', description: 'Full mission debrief with flight directors and engineering teams', time: 'T+4:00' },
]

function StatusDot({ status }: { status: RecoveryStep['status'] }) {
  return (
    <span className={`${css.dot} ${css[status]}`} data-status={status}>
      {status === 'completed' ? (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : status === 'active' ? (
        <span className={css.pulse} />
      ) : null}
    </span>
  )
}

/** Recovery Sequence Timeline widget. */
export function RecoveryWidget(_props: Record<string, never>) {
  return (
    <div className={css.timeline}>
      <div className={css.header}>
        <span className={css.headerIcon}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
            <path d="M6 3v3l2 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </span>
        RECOVERY SEQUENCE
      </div>
      <div className={css.list}>
        {RECOVERY_STEPS.map((step, i) => (
          <div key={i} className={`${css.step} ${css[step.status]}`}>
            <div className={css.stepLead}>
              <StatusDot status={step.status} />
              {i < RECOVERY_STEPS.length - 1 && <div className={css.rail} />}
            </div>
            <div className={css.stepBody}>
              <div className={css.stepTitle}>{step.title}</div>
              <div className={css.stepDesc}>{step.description}</div>
              <div className={css.stepTime}>{step.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
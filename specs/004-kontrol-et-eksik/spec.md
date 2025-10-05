# Feature Specification: Kontrol Et Eksik Kalanları Bul

**Feature Branch**: `004-kontrol-et-eksik`  
**Created**: 2025-01-27  
**Status**: Draft  
**Input**: User description: "kontrol et eksik kalanları bul
@@001-i-in-projeyi/"

## Execution Flow (main)

```
1. Parse user description from Input
   → If empty: ERROR "No feature description provided"
2. Extract key concepts from description
   → Identify: actors, actions, data, constraints
3. For each unclear aspect:
   → Mark with [NEEDS CLARIFICATION: specific question]
4. Fill User Scenarios & Testing section
   → If no clear user flow: ERROR "Cannot determine user scenarios"
5. Generate Functional Requirements
   → Each requirement must be testable
   → Mark ambiguous requirements
6. Identify Key Entities (if data involved)
7. Run Review Checklist
   → If any [NEEDS CLARIFICATION]: WARN "Spec has uncertainties"
   → If implementation details found: ERROR "Remove tech details"
8. Return: SUCCESS (spec ready for planning)
```

---

## ⚡ Quick Guidelines

- ✅ Focus on WHAT users need and WHY
- ❌ Avoid HOW to implement (no tech stack, APIs, code structure)
- 👥 Written for business stakeholders, not developers

### Section Requirements

- **Mandatory sections**: Must be completed for every feature
- **Optional sections**: Include only when relevant to the feature
- When a section doesn't apply, remove it entirely (don't leave as "N/A")

### For AI Generation

When creating this spec from a user prompt:

1. **Mark all ambiguities**: Use [NEEDS CLARIFICATION: specific question] for
   any assumption you'd need to make
2. **Don't guess**: If the prompt doesn't specify something (e.g., "login
   system" without auth method), mark it
3. **Think like a tester**: Every vague requirement should fail the "testable
   and unambiguous" checklist item
4. **Common underspecified areas**:
   - User types and permissions
   - Data retention/deletion policies
   - Performance targets and scale
   - Error handling behaviors
   - Integration requirements
   - Security/compliance needs

---

## User Scenarios & Testing _(mandatory)_

### Primary User Story

As a project manager or developer, I need to identify and track all incomplete
tasks in the tarot card implementation project so that I can prioritize
remaining work and ensure project completion.

### Acceptance Scenarios

1. **Given** a project with multiple phases and tasks, **When** I request a
   comprehensive analysis of missing items, **Then** I should receive a detailed
   report of all incomplete tasks across all phases
2. **Given** completed tasks are marked with [x], **When** I analyze the task
   list, **Then** I should see clear identification of which tasks remain
   incomplete
3. **Given** tasks have different priorities and dependencies, **When** I review
   the missing items, **Then** I should understand which tasks are blocking
   others and which can be done in parallel

### Edge Cases

- What happens when tasks are partially complete but not fully marked as done?
- How does the system handle tasks that have been completed but not properly
  marked in the tracking system?
- What if there are tasks that were added after the initial planning but not
  included in the main task list?

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST identify all tasks marked as incomplete ([ ]) in the
  project task list
- **FR-002**: System MUST categorize incomplete tasks by phase (Setup, Tests,
  Implementation, Integration, Polish, Full Card Implementation)
- **FR-003**: System MUST identify tasks that can be executed in parallel ([P]
  marked tasks)
- **FR-004**: System MUST provide a summary of completion status for each phase
- **FR-005**: System MUST identify critical path tasks that block other tasks
  from completion
- **FR-006**: System MUST distinguish between different types of missing work
  (component tests, performance tests, documentation, translations, etc.)
- **FR-007**: System MUST provide actionable next steps for completing the
  project

### Key Entities _(include if feature involves data)_

- **Task**: Represents a specific work item with ID, description, completion
  status, and dependencies
- **Phase**: Represents a group of related tasks (Setup, Tests, Implementation,
  etc.)
- **Completion Status**: Tracks whether a task is complete ([x]) or incomplete
  ([ ])

---

## Review & Acceptance Checklist

_GATE: Automated checks run during main() execution_

### Content Quality

- [x] No implementation details (languages, frameworks, APIs)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] All mandatory sections completed

### Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous
- [x] Success criteria are measurable
- [x] Scope is clearly bounded
- [x] Dependencies and assumptions identified

---

## Execution Status

_Updated by main() during processing_

- [x] User description parsed
- [x] Key concepts extracted
- [x] Ambiguities marked
- [x] User scenarios defined
- [x] Requirements generated
- [x] Entities identified
- [x] Review checklist passed

---

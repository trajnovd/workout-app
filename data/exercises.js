export const exercises = {
  // Monday: Lower Body
  "dumbbell_box_squats": {
    id: "dumbbell_box_squats",
    name: "Dumbbell Box Squats",
    description: "Sit down on your bench and stand back up while holding one dumbbell at your chest.",
    videoSource:require("../assets/videos/dumbbell_box_squats.mp4"),
    type: "reps",
    reps: 12,
    sets: 3
  },
  "weighted_glute_bridges": {
    id: "weighted_glute_bridges",
    name: "Weighted Glute Bridges",
    description: "Lie on your mat, feet flat. Place a dumbbell on your hips and lift your pelvis toward the ceiling.",
    videoSource: require("../assets/videos/weighted_glute_bridges.mp4"),
    type: "reps",
    reps: 15,
    sets: 3
  },
  "dumbbell_step_ups": {
    id: "dumbbell_step_ups",
    name: "Dumbbell Step-Ups",
    description: "Step onto your bench (or a sturdy chair/stair). Drive through your heel to stand up.",
    videoSource:require("../assets/videos/dumbbell_step_ups.mp4"),
    type: "reps",
    reps: "10 per leg",
    sets: 3
  },
  "dumbbell_rdl": {
    id: "dumbbell_rdl",
    name: "Dumbbell Romanian Deadlifts",
    description: "Hold dumbbells in front of your thighs. Hinge at the hips (butt goes back) until you feel a stretch in your hamstrings, then stand up and squeeze your glutes.",
    videoSource:  require("../assets/videos/dumbbell_rdl.mp4"),
    type: "reps",
    reps: 12,
    sets: 3
  },

  // Wednesday: Upper Body
  "single_arm_rows": {
    id: "single_arm_rows",
    name: "Single-Arm Rows",
    description: "Place one knee and one hand on the bench. Pull the dumbbell up to your hip with the other hand.",
    videoSource:require("../assets/videos/single_arm_rows.mp4"),
    type: "reps",
    reps: "12 per arm",
    sets: 3
  },
  "seated_bicep_curls": {
    id: "seated_bicep_curls",
    name: "Seated Bicep Curls",
    description: "Sit on the bench to keep your back still. Curl dumbbells toward your shoulders.",
    videoSource: require("../assets/videos/seated_bicep_curls.mp4"),
    type: "reps",
    reps: 12,
    sets: 3
  },
  "bench_tricep_dips": {
    id: "bench_tricep_dips",
    name: "Bench Tricep Dips",
    description: "Use the edge of the bench. Lower your hips toward the floor by bending your elbows, then push back up.",
    videoSource: require("../assets/videos/bench_tricep_dips.mp4"),
    type: "reps",
    reps: "10-12",
    sets: 3
  },
  "dumbbell_pullovers": {
    id: "dumbbell_pullovers",
    name: "Dumbbell Pullovers",
    description: "Lie on the bench on your back. Hold one dumbbell with both hands, lower it slowly behind your head, then pull it back over your chest.",
    videoSource: require("../assets/videos/dumbbell_pullovers.mp4"),
    type: "reps",
    reps: 12,
    sets: 3
  },
  "seated_shoulder_press": {
    id: "seated_shoulder_press",
    name: "Seated Shoulder Press",
    description: "Sit on the bench and press dumbbells from shoulder height up toward the ceiling.",
    videoSource: require("../assets/videos/seated_shoulder_press.mp4"),
    type: "reps",
    reps: 10,
    sets: 3
  },

  // Friday: Full Body
  "goblet_squats": {
    id: "goblet_squats",
    name: "Goblet Squats",
    description: "Hold a weight at chest level. Squat down and stand back up.",
    videoSource: require("../assets/videos/goblet_squats.mp4"),
    type: "reps",
    reps: 12,
    sets: 3
  },
  "dumbbell_rows_both": {
    id: "dumbbell_rows_both",
    name: "Dumbbell Rows (Both Arms)",
    description: "Lean forward slightly with a flat back and pull both weights to your hips.",
    videoSource: require("../assets/videos/dumbbell_rows_both.mp4"),
    type: "reps",
    reps: 12,
    sets: 3
  },
  "lateral_lunges": {
    id: "lateral_lunges",
    name: "Lateral Lunges",
    description: "Take a big step to the side, bending the stepping knee and keeping the other leg straight.",
    videoSource:  require("../assets/videos/lateral_lunges.mp4"),
    type: "reps",
    reps: "10 per side",
    sets: 3
  },
  "hammer_curls": {
    id: "hammer_curls",
    name: "Hammer Curls",
    description: "Like a bicep curl, but hold the dumbbells vertically (like a hammer).",
    videoSource: require("../assets/videos/hammer_curls.mp4"),
    type: "reps",
    reps: 12,
    sets: 3
  },
  "plank": {
    id: "plank",
    name: "Plank on Mat",
    description: "Hold a push-up position with your weight on your forearms. Keep your body in a straight line.",
    videoSource: require("../assets/videos/plank.mp4"),
    type: "time",
    duration: 45, // 30-45 seconds
    sets: 3
  },

  // Post-Workout
  "childs_pose": {
    id: "childs_pose",
    name: "Child’s Pose",
    description: "Kneel and sit back on your heels, stretching arms forward to relax the lower back.",
    videoSource: require("../assets/videos/childs_pose.mp4"),
    type: "time",
    duration: 60, // 1 min (approx 5 mins total routine)
    sets: 1
  },
  "cat_cow": {
    id: "cat_cow",
    name: "Cat-Cow",
    description: "On hands and knees, arch your back up (Cat) and then dip it down (Cow) to keep spine mobile.",
    videoSource: require("../assets/videos/cat_cow.mp4"),
    type: "time",
    duration: 60,
    sets: 1
  },
  "quad_stretch": {
    id: "quad_stretch",
    name: "Quad Stretch",
    description: "Stand and pull your heel to your glute to stretch the front of your legs.",
    videoSource: require("../assets/videos/quad_stretch.mp4"),
    type: "time",
    duration: 60,
    sets: 1
  }
};

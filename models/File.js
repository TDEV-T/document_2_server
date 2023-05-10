const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    files: {
      file1: {
        type: Object,
        required: true,
      },
      file2: {
        type: Object,
        required: true,
      },
      file3: {
        type: Object,
        required: true,
      },
      file4: {
        type: Object,
        required: true,
      },
      file5: {
        type: Object,
        required: true,
      },
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", FileSchema);

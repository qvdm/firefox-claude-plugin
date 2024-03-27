# Makefile to package files into claude.xpi, ensuring clean is always run first

# Files to include in the .xpi package
FILES = manifest.json background.js icon96.png icon48.png

# Default target
all: clean claude.xpi

# Target for creating claude.xpi
claude.xpi: $(FILES)
	zip claude.xpi $(FILES)

# Clean target to remove the .xpi file
clean:
	rm -f claude.xpi && echo "Clean successful" || (echo "Clean failed"; false)


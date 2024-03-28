# Makefile to package files into a target .xpi file, 

TARGET = claude.xpi

FILES = manifest.json background.js icon96.png icon48.png options.html options.js

all: clean $(TARGET)

$(TARGET): $(FILES)
	@zip $(TARGET) $(FILES) > /dev/null && echo "Packaging OK" || (echo "Packaging failed"; false)

clean:
	@rm -f $(TARGET) > /dev/null && echo "Clean OK" || (echo "Clean failed"; false)

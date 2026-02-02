FROM denoland/deno:latest

WORKDIR /app

# Copy project files
COPY . .

EXPOSE 8000

CMD ["run", "-A", "--unstable", "server_local.ts"]

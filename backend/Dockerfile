FROM alpine:latest
RUN apk add --no-cache py3-pip \
    && pip3 install --upgrade pip --break-system-packages

COPY requirements.txt .
RUN pip3 install --no-cache-dir --break-system-packages -r requirements.txt
WORKDIR /code
COPY ./app.py .

#ENV PATH=/root/.local/bin:$PATH
EXPOSE 5000
CMD [ "python", "./app.py" ]
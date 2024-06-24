#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

DOMAIN1="*.ailab.lan"
DOMAIN2="ailab.lan"
DOMAIN3="*.ailab.internal"
DOMAIN4="ailab.internal"
CERT_DIR="${SCRIPT_DIR}/certs"
CA_KEY_FILE="${CERT_DIR}/ca.key"
CA_CERT_FILE="${CERT_DIR}/ca.crt"
DOMAIN_KEY_FILE="${CERT_DIR}/ailab.key"
DOMAIN_CSR_FILE="${CERT_DIR}/ailab.csr"
DOMAIN_CERT_FILE="${CERT_DIR}/ailab.crt"
CHAIN_CERT_FILE="${CERT_DIR}/chain.crt"
CONFIG_FILE="${CERT_DIR}/openssl.cnf"
DAYS_VALID=365
NGINX_KEY_FILE="${CERT_DIR}/nginx.key"
NGINX_CERT_FILE="${CERT_DIR}/nginx.crt"
PFX_FILE="${CERT_DIR}/ailab.pfx"

mkdir -p "${CERT_DIR}"

openssl genpkey -algorithm RSA -out "${CA_KEY_FILE}" -pkeyopt rsa_keygen_bits:2048
openssl req -new -x509 -key "${CA_KEY_FILE}" -out "${CA_CERT_FILE}" -days "${DAYS_VALID}" -subj "/CN=My CA"

openssl genpkey -algorithm RSA -out "${DOMAIN_KEY_FILE}" -pkeyopt rsa_keygen_bits:2048

cat > "${CONFIG_FILE}" <<EOL
[req]
default_bits = 2048
prompt = no
default_md = sha256
distinguished_name = dn
req_extensions = req_ext

[dn]
CN = ${DOMAIN2}

[req_ext]
subjectAltName = @alt_names

[alt_names]
DNS.1 = ${DOMAIN1}
DNS.2 = ${DOMAIN2}
DNS.3 = ${DOMAIN3}
DNS.4 = ${DOMAIN4}
EOL

openssl req -new -key "${DOMAIN_KEY_FILE}" -out "${DOMAIN_CSR_FILE}" -config "${CONFIG_FILE}"

openssl x509 -req -in "${DOMAIN_CSR_FILE}" -CA "${CA_CERT_FILE}" -CAkey "${CA_KEY_FILE}" -CAcreateserial -out "${DOMAIN_CERT_FILE}" -days "${DAYS_VALID}" -extensions req_ext -extfile "${CONFIG_FILE}"

cat "${DOMAIN_CERT_FILE}" "${CA_CERT_FILE}" > "${CHAIN_CERT_FILE}"

cp "${DOMAIN_KEY_FILE}" "${NGINX_KEY_FILE}"
cp "${CHAIN_CERT_FILE}" "${NGINX_CERT_FILE}"

echo "Verifying the certificate details:"
openssl x509 -in "${DOMAIN_CERT_FILE}" -text -noout

echo "Verifying the domain certificate against the CA certificate:"
openssl verify -CAfile "${CA_CERT_FILE}" "${DOMAIN_CERT_FILE}"

echo "Verifying that the certificate and the private key match:"
CERT_MODULUS=$(openssl x509 -noout -modulus -in "${DOMAIN_CERT_FILE}" | openssl md5)
KEY_MODULUS=$(openssl rsa -noout -modulus -in "${DOMAIN_KEY_FILE}" | openssl md5)

if [ "$CERT_MODULUS" = "$KEY_MODULUS" ]; then
  echo "The certificate and private key match."
else
  echo "The certificate and private key do not match."
  exit 1
fi

echo "Generating PFX file for Windows:"
openssl pkcs12 -export -out "${PFX_FILE}" -inkey "${DOMAIN_KEY_FILE}" -in "${DOMAIN_CERT_FILE}" -certfile "${CA_CERT_FILE}"

echo "Certificate and key generated and verified successfully."

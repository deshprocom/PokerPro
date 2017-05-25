require 'faraday'
require 'json'
class RemoteFactory
  attr_accessor :conn, :response

  def initialize
    self.conn = Faraday.new(:url => remote_url) do |faraday|
      faraday.request  :url_encoded             # form-encode POST params
      faraday.response :logger                  # log requests to STDOUT
      faraday.adapter  Faraday.default_adapter  # make requests with Net::HTTP
    end
  end

  def create(ac, params = {})
    self.response = conn.get do |req|
      req.url "/factory/#{ac}", params
      req.options.timeout = 10
    end
    self
  end

  def parsed_body
    JSON.parse self.response.body
  end

  def self.create(ac, params = {})
    self.new.create(ac, params)
  end

  private

  def remote_url
    raise '必须配置 DPAPI_URL 的环境变量'  if ENV['DPAPI_URL'].nil?

    ENV['DPAPI_URL'].dup
  end
end
